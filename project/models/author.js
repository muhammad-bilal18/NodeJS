const db = require('mongoose');
const Joi = require('joi');

const authorSchema = new db.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = db.model('Author', authorSchema);

function validateAuthor(author) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        bio: Joi.string().allow('', null),
        website: Joi.string().allow('', null)
    });
    return schema.validate(author).error;
}

exports.Author = Author;
exports.validateAuthor = validateAuthor;
exports.authorSchema = authorSchema;