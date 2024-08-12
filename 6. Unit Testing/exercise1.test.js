const lib = require('./exercise1');

describe('fizzBuzz', () => {
    it('should throw an exception if input is not a number', () => {
        expect(() => { lib.fizzBuzz('number').toThrow() });
        expect(() => { lib.fizzBuzz(null).toThrow() });
        expect(() => { lib.fizzBuzz(undefined).toThrow() });
        expect(() => { lib.fizzBuzz({}).toThrow() });
        expect(() => { lib.fizzBuzz([]).toThrow() });
    });

    it('should return FizzBuzz if the input is divisible by both 3 and 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return Fizz if the input is divisible by only 3', () => {
        const result = lib.fizzBuzz(6);
        expect(result).toBe('Fizz');
    });

    it('should return Buzz if the input is divisible by only 5', () => {
        const result = lib.fizzBuzz(10);
        expect(result).toBe('Buzz');
    });
    
    it('should return given input number if the input neither divisible by 3 nor 5', () => {
        const result = lib.fizzBuzz(4);
        expect(result).toBe(4);
    });

});