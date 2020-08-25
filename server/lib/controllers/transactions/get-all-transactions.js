const { Transaction } = require('models/transaction');

const getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find().select('-__v');
  if (!transactions) return res.status(404).send('No transactions found.');
  res.send(transactions);
};

module.exports = { getAllTransactions };
