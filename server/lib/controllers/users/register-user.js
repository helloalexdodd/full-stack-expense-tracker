const bcrypt = require('bcrypt');
const { User } = require('models/user');

const registerUser = async (req, res) => {
  console.log('registerUser', req.body);
  const { username, email, password } = req.body;

  let user = await User.findOne({ username });
  if (user) return res.status(409).send({ message: 'Username not available' });

  user = await User.findOne({ email });
  if (user)
    return res.status(400).send({
      message: 'A user has already registered with this email address.',
    });

  user = new User({ username, email, password });

  if (user.email.includes('@alexdodd.ca')) user.isAdmin = true;

  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(password, salt);

  const { _id } = await user.save();
  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .send({ user: { _id, username, email }, token });
};

module.exports = registerUser;
