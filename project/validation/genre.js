const Joi = require('joi');
function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    });
    return schema.validate(genre).error;
}
exports.validateGenre = validateGenre;