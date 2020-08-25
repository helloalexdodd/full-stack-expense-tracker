const { Transaction, validateTransaction } = require('models/transaction');

const addTransaction = (req, res) => {
  const { title, amount, notes } = req.body;
  const transaction = new Transaction({ title, amount, notes });
  transaction.save();
  res.send(transaction);
};

module.exports = { addTransaction };
