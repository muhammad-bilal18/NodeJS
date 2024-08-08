const db = require('mongoose');
const Joi = require('joi');

const genreSchema = new db.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 10
    }
})

const Genre = db.model('Genre', genreSchema);

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    });
    return schema.validate(genre).error;
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validateGenre = validateGenre;