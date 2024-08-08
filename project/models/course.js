const Joi = require('joi');
const db = require('mongoose');
const { authorSchema } = require('./author');

const Course = db.model('Course', new db.Schema({
    name: String,
    author: {
        type: db.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));

const EmbeddedCourse = db.model('EmbeddedCourse', new db.Schema({
    name: String,
    author: authorSchema
}));

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        author: Joi.objectId().required()
    });
    return schema.validate(course).error;
}

function validate(course) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        author: {
            name: Joi.string().min(3).required(),
            bio: Joi.string().allow('', null),
            website: Joi.string().allow('', null)
        }
    });
    return schema.validate(course).error;
}

exports.Course = Course;
exports.validateCourse = validateCourse;
exports.validate = validate;
exports.EmbeddedCourse = EmbeddedCourse;