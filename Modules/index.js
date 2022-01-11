const Logger = require('./logger');

const logger = new Logger();
logger.on('message', (data) => console.log('Listener called', data));

logger.Log('Hello');
logger.Log('node with me');