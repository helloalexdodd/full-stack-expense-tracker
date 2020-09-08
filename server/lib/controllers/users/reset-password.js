const bcrypt = require('bcrypt');
const { User } = require('models/user');

const resetPassword = async (req, res) => {
  const { token } = req.query;
  const { password } = req.body;
  console.log({ token });
  const user = await User.findOne({ resetPasswordToken: token });
  console.log({ user });
  if (password) {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = '';
    user.resetPasswordExpires = '';
    await user.save();
    return res.send({ message: 'Your password has been reset.' });
  }
  if (user && !user.hasExpired()) {
    return res.send({ message: 'approved' });
  } else {
    return res.send({ message: 'expired' });
  }
};

module.exports = resetPassword;
