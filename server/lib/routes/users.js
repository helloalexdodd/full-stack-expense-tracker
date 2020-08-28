const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');
const auth = require('middleware/auth');
const admin = require('middleware/admin');
const validateObjectId = require('middleware/validateObjectId');
const validate = require('middleware/validate');

const { validateUser } = require('models/user');

const { getUser } = require('controllers/users/get-user');
const { addUser } = require('controllers/users/add-user');

router.get('/me/:id', [auth, admin, validateObjectId], getUser);

router.post('/', validate(validateUser), addUser);

module.exports = router;
