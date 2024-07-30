const db = require('mongoose');
const Joi = require('joi');

const Genre = db.model('Genre', new db.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 10
    }
}));

function validateGenre(prod) {
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    });
    return schema.validate(prod).error;
}

exports.Genre = Genre;
exports.validateGenre = validateGenre;