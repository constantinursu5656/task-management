const { sum } = require('./sum'); // Ensure the correct file is imported

describe('Backend Functionality', () => {
    it('should correctly sum two numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });
});