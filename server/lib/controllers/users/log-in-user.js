const { User } = require('models/user');

const errorMessage = 'Invalid username or password';

const logInUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).send({ message: errorMessage });

  const match = await user.comparePassword(password);
  if (!match) return res.status(401).send({ message: errorMessage });

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send({
    user: { username: user.username, email: user.email, _id: user._id },
    token,
  });
};

module.exports = logInUser;
