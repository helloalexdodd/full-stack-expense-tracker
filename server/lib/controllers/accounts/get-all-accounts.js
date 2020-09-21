const { User } = require('models/user');

const getAccounts = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne({ _id })
    .populate('accounts')
    .sort({ accounts: 1 });
  if (!user.accounts) return res.status(404).send('No transactions found.');

  const accounts = user.accounts
    .map((account) => ({
      name: account.name,
      _id: account._id,
    }))
    .sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 1;
    });

  res.send(accounts);
};

module.exports = getAccounts;
