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

exports.Movie = Movie;
exports.Movie_ = Movie_;