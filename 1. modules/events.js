const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('logged', (message) => {
    console.log(message);
})

emitter.emit('logged', 'user logged a message');

class Logger extends EventEmitter {
    log(name, message) {
        this.emit('messageLogged', { user: name, message: message});
    }
}

module.exports = Logger;