const { User } = require('models/user');

const getAccounts = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne({ _id }).populate('accounts');
  if (!user.accounts) return res.status(404).send('No transactions found.');

  const accounts = user.accounts.map((account) => {
    return { name: account.name, _id: account._id };
  });
  res.send(accounts);
};

module.exports = getAccounts;
