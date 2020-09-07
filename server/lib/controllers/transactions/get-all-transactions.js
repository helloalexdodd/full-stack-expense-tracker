const { Transaction } = require('models/transaction');

const getAllTransactions = async (req, res) => {
  const { _id } = req.user;
  const transactions = await Transaction.find({ user: _id });
  console.log(transactions);
  if (!transactions) return res.status(404).send('No transactions found.');
  res.send(transactions);
};

module.exports = { getAllTransactions };
