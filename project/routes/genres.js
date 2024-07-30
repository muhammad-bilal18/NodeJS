const express = require('express');
const router = express.Router();
const { Genre, validateGenre } = require('../models/genre');

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find().sort('name');
        res.render('genres', {
            title: 'Vidly - Genres',
            message: genres
        });
    }
    catch (error) {
        console.log(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const error = validateGenre(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const genre = new Genre({ name: req.body.name });
        await genre.save();
        const genres = await Genre.find().sort('name');
        res.render('genres', {
            title: 'Vidly - Genres',
            message: genres
        });
    }
    catch (error) {
        console.log(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if(!genre) return res.status(404).send('Not Found');
        res.render('genres', {
            title: 'Vidly - Genres',
            message: [ genre ]
        });
    }
    catch (error) {
        console.log(error.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if(!genre) return res.status(404).send('Not Found');
        genre.name = req.body.name;
        await genre.save();
        const genres = await Genre.find().sort('name');
        res.render('genres', {
            title: 'Vidly - Genres',
            message: genres
        });
    }
    catch (error) {
        console.log(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete({ _id: req.params.id });
        if(!genre) return res.status(404).send('Not Found');
        const genres = await Genre.find().sort('name');
        res.render('genres', {
            title: 'Vidly - Genres',
            message: genres
        });
    }
    catch(error) {
        console.log(error.message);
    }
});

module.exports = router;