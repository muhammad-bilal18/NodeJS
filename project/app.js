const express = require('express');
const { logger } = require('./middlewares/exception');

const app = express();

require('./start/logging')();
require('./start/config')();
require('./start/db')();
require('./start/routes')(app);

const port = process.env.PORT || 3000;

app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views');

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
})