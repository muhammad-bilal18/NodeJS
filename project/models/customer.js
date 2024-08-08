const Joi = require('joi');
const db = require('mongoose');

const Customer = db.model('Customer', new db.Schema({
    name: String,
    phone: String,
    isGold: {
        type: Boolean,
        default: false
    }
}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        phone: Joi.string().length(11).required(),
        isGold: Joi.boolean()
    });
    return schema.validate(customer).error;
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;