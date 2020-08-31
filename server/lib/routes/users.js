const express = require('express');
const router = express.Router();
const auth = require('middleware/auth');
const validate = require('middleware/validate');
const { validateUser } = require('models/user');
const { User } = require('models/user');

const registerUser = require('controllers/users/register-user');
const logInUser = require('controllers/users/log-in-user');

router.post('/register', validate(validateUser), registerUser);
router.post('/login', logInUser);
router.get('/me/:id', auth, async (req, res) => {
  const user = await User.findById(req.params.id).select('-__v -_password');
  if (!user) return res.status(404).send('No user found.');
  res.send(user);
});

module.exports = router;
