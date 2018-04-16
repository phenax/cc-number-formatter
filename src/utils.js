import { FW_TO_HW_MAP } from './constants';

export const Container = x => ({
  map: f => Container(f(x)),
  fold: f => f(x),
});

export const Either = x => (x ? Either.Right(x) : Either.Left(x));

Either.Left = x => ({
  // map: _ => Either.Left(x),
  fold: (f, _) => f(x),
});
Either.Right = x => ({
  // map: f => Either.Right(f(x)),
  fold: (_, f) => f(x),
});

export const removeEmpty = arr => arr.filter(Boolean);
export const tail = ([_, ...arr]) => arr;
export const first = ([firstEl]) => firstEl;
export const join = glue => arr => arr.join(glue);
export const split = seperator => str => str.split(seperator);
export const getMaximum = arr => Math.max(...arr);

export const sliceString = str => max => str.slice(0, max);
export const getHalfWidthChar = char => FW_TO_HW_MAP[char] || char;
export const removeNonDigitCharacters = num => num.replace(/\D/g, '');

export const getRegexMatches = formatRegex => cardNum =>
  Either(formatRegex.global).fold(
    () =>
      Container(cardNum)
        .map(num => formatRegex.exec(num) || [])
        .map(tail)
        .fold(removeEmpty),
    () => cardNum.match(formatRegex) || [],
  );

export const replaceFullWidthChars = str =>
  Container(str || '')
    .map(split(''))
    .map(str => str.map(getHalfWidthChar))
    .fold(join(''));

export const sliceCardNumber = validLengths => cardNum =>
  Container(validLengths)
    .map(getMaximum)
    .fold(sliceString(cardNum));
