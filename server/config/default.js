require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  jwtPrivateKey: '',
  db: 'mongodb://localhost/expense-tracker',
  emailAddress: '',
  emailPassword: '',
  baseUrl: 'http://localhost:8080/#',
};
