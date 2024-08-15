const express = require('express');
const home = require('../routes/home');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const courses = require('../routes/courses');
const authors = require('../routes/authors');
const movies = require('../routes/movies');
const user = require('../routes/user');
const auth = require('../routes/auth');
const cors = require('cors');

const { exception } = require('../middlewares/exception');

module.exports = function () {
    const app = express();
    app.use(cors());
    app.use(express.json());
    
    app.use('/', home);
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/courses', courses);
    app.use('/api/authors', authors)
    app.use('/api/movies', movies);
    app.use('/api/users', user);
    app.use('/api/auth', auth);

    app.use(exception);
    return app;
}