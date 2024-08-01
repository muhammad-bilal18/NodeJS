const express = require('express');
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const courses = require('./routes/courses');
const authors = require('./routes/authors');
const movies = require('./routes/movies');
const user = require('./routes/user');
const config = require('config');
const auth = require('./routes/auth');
const debug = require('debug')('app:startup');
const db = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

db.connect('mongodb://localhost/project')
    .then(() => {
        debug('connected to database');
    })
    .catch(err => {
        debug('Error:', err);
    });

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views');

app.listen(port, () => {
    debug(`Server listening on port ${port}`);
})

app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/courses', courses);
app.use('/api/authors', authors)
app.use('/api/movies', movies);
app.use('/api/users', user);
app.use('/api/auth', auth);