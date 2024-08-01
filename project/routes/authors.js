const express = require('express');
const router = express.Router();
const { Author, validateAuthor } = require('../models/author');

router.post('/', async (req, res) => {
    try {
        const error = validateAuthor(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const author= new Author({
            name: req.body.name,
            bio: req.body.bio,
            website: req.body.website
        });

        const result = await author.save();
        res.status(200).send(result);
    }
    catch (error) {
        console.error(error.message);
    }
});

module.exports = router;