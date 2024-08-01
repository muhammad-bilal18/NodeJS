const express = require('express');
const router = express.Router();
const { Movie, validateMovie, Movie_, validate } = require('../models/movies');
const { Genre } = require('../models/genre');

router.post('/', async (req, res) => {
    try {
        const error = validateMovie(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const movie = new Movie(req.body);
        await movie.save();
        const movies = await Movie
        .find()
        .sort('name');
        res.render('movies', {
            movies: movies
        });
    }
    catch (error) {
        console.error(error.message);
    }
});

router.post('/save', async (req, res) => {
    try {
        const error = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const genre = await Genre.findById(req.body.genreID);
        if (!genre) return res.status(404).send('Genre not found.');

        const movie = new Movie_({
            name: req.body.name,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numbersInStock: req.body.numbersInStock,
            dailyRentalRate: req.body.dailyRentalRate,
        });
        const result = await movie.save();
        res.send(result);
    }
    catch (error) {
        console.error(error.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const movies = await Movie
            .find()
            .sort('name');
        res.render('movies', {
            movies: movies
        });
    }
    catch (error) {
        console.log(error.message);
    }
});

module.exports = router;