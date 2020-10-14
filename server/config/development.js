require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  jwtPrivateKey: 'super_secret_key',
  db: process.env.DB || 'mongodb://localhost/expense-tracker',
  emailAddress: process.env.EMAIL_ADDRESS || '',
  emailPassword: process.env.EMAIL_PASSWORD || '',
  baseUrl: process.env.BASE_URL || 'http://localhost:8080/#',
};
