const Joi = require('joi');
function validateUser(User) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().min(7).max(30).required().email(),
        password: Joi.string().min(8).required(),
        isAdmin: Joi.boolean().required()
    });
    return schema.validate(User).error;
}
exports.validateUser = validateUser;