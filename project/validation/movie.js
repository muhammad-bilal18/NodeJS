const Joi = require('joi');
function validateMovie(movie) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        genres: Joi.array().items(
            Joi.object({
                name: Joi.string().min(4).required()
            })
        ).required(),
        numbersInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required(),
    });
    return schema.validate(movie).error;
}

function validate(movie) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        genreID: Joi.objectId().required(),
        numbersInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required(),
    });
    return schema.validate(movie).error;
}
exports.validate = validate;
exports.validateMovie = validateMovie;