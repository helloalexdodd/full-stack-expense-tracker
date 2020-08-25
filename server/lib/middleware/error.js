const { logger } = require('logger');
const { error } = require('winston');

module.exports = (err, req, res, next) => {
  logger.error('error', err.message);
  error(err.message, err);

  res
    .status(500)
    .send(
      'Our bad! Something went wrong on our end. Maybe try again later? 🤷🏻‍♂️',
    );
};
