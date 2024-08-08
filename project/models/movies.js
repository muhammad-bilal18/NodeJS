const Joi = require('joi');
const db = require('mongoose');
const { genreSchema } = require('./genre');

const Movie = db.model('Movie', new db.Schema({
    name: String,
    genres: [ genreSchema ],
    numbersInStock: Number,
    dailyRentalRate: Number
}));

const Movie_ = db.model('Movie_', new db.Schema({
    name: String,
    genre: genreSchema,
    numbersInStock: Number,
    dailyRentalRate: Number
}));

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

exports.Movie = Movie;
exports.Movie_ = Movie_;
exports.validate = validate;
exports.validateMovie = validateMovie;