const db = require("mongoose");
const { logger } = require("../middlewares/exception");

module.exports = function () {
    db.connect('mongodb://localhost/project')
    .then(() => {
        logger.info('connected to database');
    });
}