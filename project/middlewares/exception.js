const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
    level: 'silly',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'warn'
        }),
        new winston.transports.Console({
            level: 'silly',
        }),
        new winston.transports.MongoDB({
            db: 'mongodb://localhost/project',
            options: { useUnifiedTopology: true },
            level: 'error'
        })
    ]
});

module.exports.exception = function (ex, req, res, next) {
    logger.warn(ex.message);
    res.status(500).send('Something went wrong ...');
}
module.exports.logger = logger;