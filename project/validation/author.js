const Joi = require('joi');
function validateAuthor(author) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        bio: Joi.string().allow('', null),
        website: Joi.string().allow('', null)
    });
    return schema.validate(author).error;
}
exports.validateAuthor = validateAuthor;