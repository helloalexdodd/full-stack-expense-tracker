const { User } = require('models/user');
const { Transaction } = require('models/transaction');

const getAllTransactions = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne({ _id }).populate('transactions accounts');
  if (!user.transactions) return res.status(404).send('No transactions found.');

  const transactions = await Transaction.find({
    _id: { $in: user.transactions },
  }).populate('account');

  res.send(transactions);
};

module.exports = getAllTransactions;
