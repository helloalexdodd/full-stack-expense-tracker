const error = require('middleware/error');
const transactions = require('./transactions');
const accounts = require('./accounts');
const users = require('./users');

module.exports = (app) => {
  app.use('/v1/transactions', transactions);
  app.use('/v1/accounts', accounts);
  app.use('/v1/users', users);
  app.use(error);
};
