import { CARD_TYPES } from './constants';
import {
  Container,
  join,
  first,
  sliceCardNumber,
  getRegexMatches,
  replaceFullWidthChars,
  removeNonDigitCharacters,
} from './utils';

const splitCardNumberIntoGroups = cardNumber => {
  const { validLengths, formatRegex } = getCardType(cardNumber);

  return Container(cardNumber)
    .map(sliceCardNumber(validLengths))
    .fold(getRegexMatches(formatRegex));
};

export const sanitizeCardNumber = cardNumber =>
  Container(cardNumber)
    .map(replaceFullWidthChars)
    .fold(removeNonDigitCharacters);

export const getCardType = cardNumber =>
  Container(cardNumber)
    .map(sanitizeCardNumber)
    .map(num => CARD_TYPES.filter(card => card.pattern.test(num)))
    .fold(first);

export const formatCardNumber = cardNumber =>
  Container(cardNumber)
    .map(sanitizeCardNumber)
    .map(splitCardNumberIntoGroups)
    .fold(join(' '));
