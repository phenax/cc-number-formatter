(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['card-number-formatter'] = {})));
}(this, (function (exports) { 'use strict';

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var DEFAULT_FORMAT_REGEX = /(\d{1,4})/g;

  var FULL_WIDTH_CHARS = '０１２３４５６７８９';
  var HALF_WIDTH_CHARS = '0123456789';

  var FW_TO_HW_MAP = FULL_WIDTH_CHARS.split('').reduce(function (carry, char, index) {
    return Object.assign(carry, _defineProperty({}, char, HALF_WIDTH_CHARS[index] || ''));
  }, {});

  var CARD_TYPES = [{
    type: 'maestro',
    pattern: /^(5(018|0[23]|[68])|6(39|7))/,
    formatRegex: DEFAULT_FORMAT_REGEX,
    validLengths: [12, 13, 14, 15, 16, 17, 18, 19]
  }, {
    type: 'visa',
    pattern: /^4/,
    formatRegex: DEFAULT_FORMAT_REGEX,
    validLengths: [13, 16]
  }, {
    type: 'amex',
    pattern: /^3[47]/,
    formatRegex: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    validLengths: [15]
  }, {
    type: 'dinersclub',
    pattern: /^3[0689]/,
    formatRegex: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
    validLengths: [14]
  }, {
    type: 'unionpay',
    pattern: /^(62|88)/,
    formatRegex: DEFAULT_FORMAT_REGEX,
    validLengths: [16, 17, 18, 19]
  }, {
    type: 'unknown',
    pattern: /.*/,
    formatRegex: DEFAULT_FORMAT_REGEX,
    validLengths: [16]
  }];

  var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

  function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

  var Container = function Container(x) {
    return {
      map: function map(f) {
        return Container(f(x));
      },
      fold: function fold(f) {
        return f(x);
      }
    };
  };

  var Either = function Either(x) {
    return x ? Either.Right(x) : Either.Left(x);
  };

  Either.Left = function (x) {
    return {
      // map: _ => Either.Left(x),
      fold: function fold(f, _) {
        return f(x);
      }
    };
  };
  Either.Right = function (x) {
    return {
      // map: f => Either.Right(f(x)),
      fold: function fold(_, f) {
        return f(x);
      }
    };
  };

  var removeEmpty = function removeEmpty(arr) {
    return arr.filter(Boolean);
  };
  var tail = function tail(_ref) {
    var _ref2 = _toArray(_ref),
        _ = _ref2[0],
        arr = _ref2.slice(1);

    return arr;
  };
  var first = function first(_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
        firstEl = _ref4[0];

    return firstEl;
  };
  var join = function join(glue) {
    return function (arr) {
      return arr.join(glue);
    };
  };
  var split = function split(seperator) {
    return function (str) {
      return str.split(seperator);
    };
  };
  var getMaximum = function getMaximum(arr) {
    return Math.max.apply(Math, _toConsumableArray(arr));
  };

  var sliceString = function sliceString(str) {
    return function (max) {
      return str.slice(0, max);
    };
  };
  var getHalfWidthChar = function getHalfWidthChar(char) {
    return FW_TO_HW_MAP[char] || char;
  };
  var removeNonDigitCharacters = function removeNonDigitCharacters(num) {
    return num.replace(/\D/g, '');
  };

  var getRegexMatches = function getRegexMatches(formatRegex) {
    return function (cardNum) {
      return Either(formatRegex.global).fold(function () {
        return Container(cardNum).map(function (num) {
          return formatRegex.exec(num) || [];
        }).map(tail).fold(removeEmpty);
      }, function () {
        return cardNum.match(formatRegex) || [];
      });
    };
  };

  var replaceFullWidthChars = function replaceFullWidthChars(str) {
    return Container(str || '').map(split('')).map(function (str) {
      return str.map(getHalfWidthChar);
    }).fold(join(''));
  };

  var sliceCardNumber = function sliceCardNumber(validLengths) {
    return function (cardNum) {
      return Container(validLengths).map(getMaximum).fold(sliceString(cardNum));
    };
  };

  var splitCardNumberIntoGroups = function splitCardNumberIntoGroups(cardNumber) {
    var _getCardType = getCardType(cardNumber),
        validLengths = _getCardType.validLengths,
        formatRegex = _getCardType.formatRegex;

    return Container(cardNumber).map(sliceCardNumber(validLengths)).fold(getRegexMatches(formatRegex));
  };

  var sanitizeCardNumber = function sanitizeCardNumber(cardNumber) {
    return Container(cardNumber).map(replaceFullWidthChars).fold(removeNonDigitCharacters);
  };

  var getCardType = function getCardType(cardNumber) {
    return Container(cardNumber).map(sanitizeCardNumber).map(function (num) {
      return CARD_TYPES.filter(function (card) {
        return card.pattern.test(num);
      });
    }).fold(first);
  };

  var formatCardNumber = function formatCardNumber(cardNumber) {
    return Container(cardNumber).map(sanitizeCardNumber).map(splitCardNumberIntoGroups).fold(join(' '));
  };

  exports.sanitizeCardNumber = sanitizeCardNumber;
  exports.getCardType = getCardType;
  exports.formatCardNumber = formatCardNumber;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
