const express = require('express');
const Joi = require('joi');
const app = express();
const debug = require('debug')('app:startup');
const config = require('config');
const prducts = require('./routes/products')
const home = require('./routes/home')
const port = process.env.PORT || 3000;
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use('/api/products', prducts);
app.use('/', home);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    debug(`Name : ${config.get('name')}`)
    debug(`Name : ${config.get('mail')}`)
})