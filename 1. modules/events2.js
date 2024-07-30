const Logger = require('./events');
const logger = new Logger();

logger.on('messageLogged', (arg) => {
    console.log(`${arg.user} : ${arg.message}`);
});

logger.log('Bilal', 'I have extended EventEmitter class');