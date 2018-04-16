import { replaceFullWidthChars, sliceCardNumber } from '../src/utils';

describe('replaceFullWidthChars', () => {
  it('should replace passed full width character to half width', () => {
    expect(replaceFullWidthChars('９０１２３４５６７８')).toBe('9012345678');
  });

  it('should return empty string for empty inputs', () => {
    expect(replaceFullWidthChars('')).toBe('');
    expect(replaceFullWidthChars(null)).toBe('');
    expect(replaceFullWidthChars(undefined)).toBe('');
    expect(replaceFullWidthChars(false)).toBe('');
  });
});

describe('sliceCardNumber', () => {
  it('should slice passed string to the max value in the given array', () => {
    expect(sliceCardNumber([1, 3, 5])('123456789')).toBe('12345');
    expect(sliceCardNumber([1])('2123456789')).toBe('2');
    expect(sliceCardNumber([])('123456789')).toBe('');
  });
});
