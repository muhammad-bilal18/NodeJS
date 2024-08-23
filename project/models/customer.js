const db = require('mongoose');

const Customer = db.model('Customer', new db.Schema({
    name: String,
    phone: String,
    isGold: {
        type: Boolean,
        default: false
    }
}));



exports.Customer = Customer;