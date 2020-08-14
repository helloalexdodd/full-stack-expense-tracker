const error = require('middleware/error');
const transactions = require('./transactions');
const users = require('./users');

module.exports = (app) => {
  app.use('/v1/transactions', transactions);
  app.use('/v1/users', users);
  app.use(error);
};
