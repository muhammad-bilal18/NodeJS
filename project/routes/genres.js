const express = require('express');
const router = express.Router();
const { Genre } = require('../models/genre');
const { validateGenre } = require('../validation/genre');
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.status(200).send(genres);
});

router.post('/', [auth, admin], async (req, res) => {
    const error = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = new Genre({ name: req.body.name });
    await genre.save();
    const genres = await Genre.find().sort('name');
    res.render('genres', {
        title: 'Vidly - Genres',
        message: genres
    });
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('Not Found');
    res.render('genres', {
        title: 'Vidly - Genres',
        message: [ genre ]
    });
});

router.put('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('Not Found');
    genre.name = req.body.name;
    await genre.save();
    const genres = await Genre.find().sort('name');
    res.render('genres', {
        title: 'Vidly - Genres',
        message: genres
    });
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndDelete({ _id: req.params.id });
    if(!genre) return res.status(404).send('Not Found');
    const genres = await Genre.find().sort('name');
    res.render('genres', {
        title: 'Vidly - Genres',
        message: genres
    });
});

module.exports = router;