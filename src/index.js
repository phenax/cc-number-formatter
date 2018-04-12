
const defaultFormattingRegex = /(\d{1,4})/g;

const cardTypes = [
	{
		type: 'maestro',
		pattern: /^(5(018|0[23]|[68])|6(39|7))/,
		format: defaultFormattingRegex,
		length: [12, 13, 14, 15, 16, 17, 18, 19],
	},
	{
		type: 'visa',
		pattern: /^4/,
		format: defaultFormattingRegex,
		length: [13, 16],
	},
	{
		type: 'amex',
		pattern: /^3[47]/,
		format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
		length: [15],
	},
	{
		type: 'dinersclub',
		pattern: /^3[0689]/,
		format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
		length: [14],
	},
	{
		type: 'unionpay',
		pattern: /^(62|88)/,
		format: defaultFormattingRegex,
		length: [16, 17, 18, 19],
	},
	{
		type: 'unknown',
		pattern: /.*/,
		format: defaultFormattingRegex,
		length: [16],
	},
];

const replaceFullWidthChars = function(str) {
	const FULL_WIDTH_CHARS = '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19';
	const HALF_WIDTH_CHARS = '0123456789';
	return (str || '').split('')
		.map(char => {
			const charIndex = FULL_WIDTH_CHARS.indexOf(char);
			return charIndex !== -1 ? HALF_WIDTH_CHARS[charIndex] : char;
		})
		.join('');
};

export const sanitizeCardNumber = cardNumber => {
	cardNumber = replaceFullWidthChars(cardNumber);
	cardNumber = (cardNumber + '').replace(/\D/g, '');
	return cardNumber;
};

export const getCardType = function(num) {
	num = sanitizeCardNumber(num);
	const cardType = cardTypes.find(card => card.pattern.test(num));
	return cardType;
};

export const formatCardNumber = function(num) {
	let cardNumber = sanitizeCardNumber(num);
	
	const cardType = getCardType(cardNumber);
	
	const maxLength = cardType.length[cardType.length.length - 1];
	cardNumber = cardNumber.slice(0, maxLength);
	
	let groups = [];
	
	// DANGER ZONE
	if (cardType.format.global) {
		groups = cardNumber.match(cardType.format);
	} else {
		groups = cardType.format.exec(cardNumber);
		if (groups == null) {
			return '';
		}
		
		groups.shift();
		groups = groups.filter(Boolean);
	}
	
	return (groups || []).join(' ');
};

