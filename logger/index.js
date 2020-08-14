const logger = require('winston');
const config = require('config');
require('winston-mongodb');

const { combine, timestamp, prettyPrint } = logger.format;
const db = config.get('db');

logger.add(
  new logger.transports.File({
    level: 'info',
    filename: 'logger/logfile.log',
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    colorize: true,
    format: combine(timestamp(), prettyPrint()),
  }),
);

logger.add(
  new logger.transports.Console({
    level: 'debug',
    colorize: true,
    format: combine(timestamp(), prettyPrint()),
  }),
);

logger.add(
  new logger.transports.MongoDB({
    db,
    options: { useUnifiedTopology: true },
  }),
);

module.exports = { logger };
