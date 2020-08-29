const { User } = require('models/user');

const errorMessage = 'Invalid username or password';

const logInUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).send(errorMessage);

  const match = await user.comparePassword(password);
  if (!match) return res.status(401).send(errorMessage);

  res.send({ username: user.username, email: user.email });
};

module.exports = logInUser;
