const { Account } = require('models/account');
const { User } = require('models/user');

const addAccount = async (req, res) => {
  const { name } = req.body;
  const { _id } = req.user;
  const account = await new Account({ name });

  const user = await User.findOne({ _id });
  user.accounts.push(account._id);
  await user.save();

  account.user = user._id;

  await account.save();

  res.send(account);
};

module.exports = addAccount;
