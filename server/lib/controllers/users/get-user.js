const { User } = require('models/user');

const getUser = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select('-password');
  res.send(user);
};

module.exports = { getUser };
