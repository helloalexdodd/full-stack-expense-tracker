const { Account } = require('models/account');
const { User } = require('models/user');
const { Transaction } = require('models/transaction');

const removeAccount = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const user = await User.findById({ _id }).populate('transactions', 'account');

  user.transactions = await user.transactions.filter((transaction) => {
    return transaction.account.toString() !== id;
  });

  user.accounts = user.accounts.filter((account) => account.toString() !== id);

  await Transaction.deleteMany({ account: id });
  const account = await Account.findByIdAndRemove({ _id: id });

  await user.save();

  res.send(account);
};

module.exports = removeAccount;
