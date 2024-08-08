const winston = require('winston');
const { logger } = require('../middlewares/exception');
require('express-async-errors');

module.exports = function() {

    process.on('uncaughtException', (ex) => {
        logger.warn(ex.message);
        process.exit(1);
    })

    process.on('unhandledRejection', (ex) => {
        logger.warn(ex.message);
        process.exit(1);
    })
}