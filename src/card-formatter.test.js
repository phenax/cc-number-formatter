import { formatCardNumber } from './index';

describe('formatCardNumber', () => {
	// Unknown
	it('should format card to 4x4 even if card type is not known', () => {
		expect(formatCardNumber('')).toBe('');
		expect(formatCardNumber('111111111111')).toBe('1111 1111 1111');
		expect(formatCardNumber('2111111111111')).toBe('2111 1111 1111 1');
		expect(formatCardNumber('21111111111111111111')).toBe('2111 1111 1111 1111');
	});
	
	// Visa
	it('should format 13 digit visa card numbers', () => {
		expect(formatCardNumber('4929090905791')).toBe('4929 0909 0579 1');
		expect(formatCardNumber('4485631550786')).toBe('4485 6315 5078 6');
	});
	it('should format 16 digit visa card numbers to 4x4', () => {
		expect(formatCardNumber('4111111111111111')).toBe('4111 1111 1111 1111');
		expect(formatCardNumber('4929940493660028')).toBe('4929 9404 9366 0028');
		expect(formatCardNumber('4393398158868260')).toBe('4393 3981 5886 8260');
		expect(formatCardNumber('4921818425002311')).toBe('4921 8184 2500 2311');
	});
	it('should slice visa card number after 16 digits', () => {
		expect(formatCardNumber('411111111111111122222')).toBe('4111 1111 1111 1111');
		expect(formatCardNumber('43933981588682609279823478')).toBe('4393 3981 5886 8260');
	});
	
	// Mastercard
	it('should format mastercard card numbers to 4x4', () => {
		expect(formatCardNumber('5531008290366921')).toBe('5531 0082 9036 6921');
		expect(formatCardNumber('4377486605095908')).toBe('4377 4866 0509 5908');
	});
	it('should slice mastercard card number after 16 digits', () => {
		expect(formatCardNumber('553100829036692122222')).toBe('5531 0082 9036 6921');
		expect(formatCardNumber('437748660509590853345')).toBe('4377 4866 0509 5908');
	});
	
	// Maestro
	it('should format maestro card numbers to XXXX XXXX XXXX XXXX XXX', () => {
		expect(formatCardNumber('6304650001647892')).toBe('6304 6500 0164 7892');
		expect(formatCardNumber('6771771771771771774')).toBe('6771 7717 7177 1771 774');
		expect(formatCardNumber('5020540692457955')).toBe('5020 5406 9245 7955');
	});
	it('should slice maestro card number after 19 digits', () => {
		expect(formatCardNumber('677177177177177177411999')).toBe('6771 7717 7177 1771 774');
		expect(formatCardNumber('677177177177177177411999')).toBe('6771 7717 7177 1771 774');
	});
	
	// Misc
	it('should format card number for other types', () => {
		// Dinners club
		expect(formatCardNumber('36206300000099')).toBe('3620 630000 0099');
		expect(formatCardNumber('3607050000000000065')).toBe('3607 050000 0000');
		
		// Discover
		expect(formatCardNumber('6544440044440046')).toBe('6544 4400 4444 0046');
		expect(formatCardNumber('654444004444004611')).toBe('6544 4400 4444 0046');
		expect(formatCardNumber('6011182655405900')).toBe('6011 1826 5540 5900');
		expect(formatCardNumber('6011089539957115')).toBe('6011 0895 3995 7115');
		
		// Amex
		expect(formatCardNumber('374245001721009')).toBe('3742 450017 21009');
		expect(formatCardNumber('37424500172100911')).toBe('3742 450017 21009');
	});
	
	// Fullwidth character
	it('should format card number if entered in fullwidth', () => {
		expect(formatCardNumber('１１１１１１１１１１１１')).toBe('1111 1111 1111');
		expect(formatCardNumber('4１１１１１１１１１１１１111')).toBe('4111 1111 1111 1111');
		expect(formatCardNumber('３７４２４５００１７２１００９１１')).toBe('3742 450017 21009');
	});
});
