const express = require('express');
const home = require('./routes/home');
const genres = require('./routes/genres');
const debug = require('debug')('app:startup')

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