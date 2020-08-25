const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('middleware/auth');
const admin = require('middleware/admin');
const validateObjectId = require('middleware/validateObjectId');
const validate = require('middleware/validate');

const { User, validateUser } = require('models/user');

router.get('/me/:id', [auth, validateObjectId], async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select('-password');
  res.send(user);
});

router.post('/', [auth, admin, validate(validateUser)], async (req, res) => {
  const { username, email, password } = req.body;

  let user = await User.findOne({ username });
  if (user) return res.status(400).send('Username not available');

  user = await User.findOne({ email });
  if (user)
    return res
      .status(400)
      .send('A user has already registered with this email address.');

  user = new User({ username, email, password });

  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(password, salt);

  const { _id } = await user.save();
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).status(200).send({ _id, username, email });
});

module.exports = router;
