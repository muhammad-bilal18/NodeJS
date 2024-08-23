const Joi = require('joi');
function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        phone: Joi.string().length(11).required(),
        isGold: Joi.boolean()
    });
    return schema.validate(customer).error;
}
exports.validateCustomer = validateCustomer;