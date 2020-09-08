const express = require('express');
const router = express.Router();
const validate = require('middleware/validate');
const { validateUser, validatePassword } = require('models/user');

const registerUser = require('controllers/users/register-user');
const logInUser = require('controllers/users/log-in-user');
const forgotPassword = require('controllers/users/forgot-password');
const resetPassword = require('controllers/users/reset-password');

router.post('/register', validate(validateUser), registerUser);
router.post('/login', logInUser);

router.post('/forgot_password', forgotPassword);
router.get('/reset_password', resetPassword);
router.put('/reset_password', validate(validatePassword), resetPassword);

module.exports = router;
