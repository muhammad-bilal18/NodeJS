const express = require('express');
const router = express.Router();
const { Course, EmbeddedCourse } = require('../models/course');
const { Author } = require('../models/author');
const { validate, validateCourse } = require('../validation/course');

router.get('/', async (req, res) => {
    const courses = await Course
        .find()
        .select('-_id')
        .populate('author', 'name -_id')
        .sort('name');
    res.render('courses', {
        courses: courses
    });
});

router.post('/', async (req, res) => {
    const error = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const author = await Author.findById(req.body.author);
    if (!author) return res.status(400).send('Invalid author!');

    const course = new Course({
        name: req.body.name,
        author: req.body.author
    });

    const result = await course.save();
    res.status(200).send(result);
});

router.post('/embeddings', async (req, res) => {
    const error = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const course = new EmbeddedCourse({
        name: req.body.name,
        author: req.body.author
    });

    const result = await course.save();
    res.status(200).send(result);
});

router.get('/embeddings', async (req, res) => {
    const courses = await EmbeddedCourse
        .find()
        .select('name author.name')
        .sort('name');
    res.render('courses', {
        courses: courses
    });
});

module.exports = router;