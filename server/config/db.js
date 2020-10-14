const mongoose = require('mongoose');
const config = require('config');
const { logger } = require('logger');

module.exports = async () => {
  const db = config.get('db');

  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    if (process.env.NODE_ENV !== 'production') {
      logger.info(`Connected to ${db}...`);
    } else {
      logger.info(`Connected to database...`);
    }
  } catch (err) {
    console.log(err);
  }
};
