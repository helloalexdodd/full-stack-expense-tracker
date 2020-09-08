const { User } = require('models/user');
const { Transaction } = require('models/transaction');

const getAllTransactions = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findOne({ _id }).populate('transactions');
  if (!user.transactions) return res.status(404).send('No transactions found.');
  res.send(user.transactions);
};

module.exports = { getAllTransactions };
