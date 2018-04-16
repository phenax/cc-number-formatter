export const DEFAULT_FORMAT_REGEX = /(\d{1,4})/g;

export const FULL_WIDTH_CHARS = '０１２３４５６７８９';
export const HALF_WIDTH_CHARS = '0123456789';

export const FW_TO_HW_MAP = FULL_WIDTH_CHARS.split('').reduce(
  (carry, char, index) => Object.assign(carry, {
    [char]: HALF_WIDTH_CHARS[index] || '',
  }), {});

export const CARD_TYPES = [
  {
    type: 'maestro',
    pattern: /^(5(018|0[23]|[68])|6(39|7))/,
    formatRegex: DEFAULT_FORMAT_REGEX,
    validLengths: [12, 13, 14, 15, 16, 17, 18, 19],
  },
  {
    type: 'visa',
    pattern: /^4/,
    formatRegex: DEFAULT_FORMAT_REGEX,
    validLengths: [13, 16],
  },
  {
    type: 'amex',
    pattern: /^3[47]/,
    formatRegex: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    validLengths: [15],
  },
  {
    type: 'dinersclub',
    pattern: /^3[0689]/,
    formatRegex: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
    validLengths: [14],
  },
  {
    type: 'unionpay',
    pattern: /^(62|88)/,
    formatRegex: DEFAULT_FORMAT_REGEX,
    validLengths: [16, 17, 18, 19],
  },
  {
    type: 'unknown',
    pattern: /.*/,
    formatRegex: DEFAULT_FORMAT_REGEX,
    validLengths: [16],
  },
];
