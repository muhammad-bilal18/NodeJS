const Joi = require('joi');
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
exports.validateCourse = validateCourse;
exports.validate = validate;