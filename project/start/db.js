const db = require("mongoose");
const { logger } = require("../middlewares/exception");
const config = require("config");

module.exports = function () {
    db.connect(config.get('db'))
    .then(() => {
        logger.info(`connected to ${config.get('db')}`);
    });
}