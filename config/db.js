const mongoose = require('mongoose');
const config = require('config');
const { logger } = require('logger');

module.exports = () => {
  const db = config.get('db');
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => logger.info(`Connected to ${db}...`));
};
