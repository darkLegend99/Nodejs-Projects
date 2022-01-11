const EventEmitter = require('events');
const uuid = require('uuid');

class Logger extends EventEmitter {
    Log(msg){
        // call event
        this.emit('message', {id: uuid.v4(), msg})
    }
}
// console.log(uuid.v4());

module.exports = Logger;