const {validateGenre} = require('../../../models/genre');

describe('validateGenre', () => {
    it('should return an error if input name is invalid', () => {
        const error = validateGenre({
            name: 'fic'
        })
        expect(error).toBeTruthy();
    })
    
    it('should return null if input name is valid', () => {
        const error = validateGenre({
            name: 'action'
        })
        expect(error).toBe(undefined);
    })
})
