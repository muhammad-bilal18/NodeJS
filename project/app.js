const express = require('express');
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const debug = require('debug')('app:startup');
const db = require('mongoose');

db.connect('mongodb://localhost/project')
    .then(() => {
        console.log('connected to database');
    })
    .catch(err => {
        console.log('Error:', err);
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