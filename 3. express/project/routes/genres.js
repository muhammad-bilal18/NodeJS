const express = require('express');
const Joi = require('joi');

const router = express.Router();

let genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Horror" },
    { id: 3, name: "Thriller" },
];

router.get('/', (req, res) => {
    res.render('genres', {
        title: 'Vidly - Genres',
        message: genres
    });
});

router.post('/', (req, res) => {
    const error = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const gen = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(gen);
    res.render('genres', {
        title: 'Vidly - Genres',
        message: genres
    });
});

function validateGenre(gen) {
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    });
    return schema.validate(gen).error;
}

module.exports = router;