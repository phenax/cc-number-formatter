import * as R from 'ramda/src/merge';
const merge = R.default;

import { FULL_WIDTH_CHARS, HALF_WIDTH_CHARS } from './constants';
import { Container, Either } from './fns';


const FW_TO_HW_MAP = FULL_WIDTH_CHARS.split('').reduce(
  (carry, char, index) => merge(carry, {
    [char]: HALF_WIDTH_CHARS[index] || '',
  }), {});


export const compact = arr => arr.filter(Boolean);
export const join = glue => arr => arr.join(glue);
export const split = seperator => str => str.split(seperator);
export const head = ([ head ]) => head;
export const tail = ([ _, ...tail ]) => tail;
export const max = arr => Math.max(...arr);

export const sliceString = str => max => str.slice(0, max);
export const getHalfWidthChar = char => FW_TO_HW_MAP[char] || char;
export const removeNonDigitCharacters = num => num.replace(/\D/g, '');

export const getRegexMatches = formatRegex => cardNum =>
  Either(formatRegex.global).fold(
    () =>
      Container(cardNum)
        .map(num => formatRegex.exec(num) || [])
        .map(tail)
        .fold(compact),
    () => cardNum.match(formatRegex) || [],
  );

export const replaceFullWidthChars = str =>
  Container(str || '')
    .map(split(''))
    .map(str => str.map(getHalfWidthChar))
    .fold(join(''));

export const sliceCardNumber = validLengths => cardNum =>
  Container(validLengths)
    .map(max)
    .fold(sliceString(cardNum));
