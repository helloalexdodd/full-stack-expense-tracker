const { Account } = require('models/account');
const { User } = require('models/user');
const { Transaction } = require('models/transaction');

const removeAccount = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  await Transaction.deleteMany({ account: id });

  const user = await User.findOne({ _id }).populate('transactions');
  user.transactions = user.transactions.filter(
    (transaction) => transaction.account.toString() !== id
  );

  user.accounts = user.accounts.filter((account) => account.toString() !== id);

  await user.save();

  const account = await Account.findByIdAndRemove({ _id: id });

  res.send(account);
};

module.exports = removeAccount;
