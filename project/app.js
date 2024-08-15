const { logger } = require('./middlewares/exception');

const app = require('./start/createServer')();


require('./start/logging')();
require('./start/config')();
require('./start/db')();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
})