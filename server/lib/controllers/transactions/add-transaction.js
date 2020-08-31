const { Transaction } = require('models/transaction');

const addTransaction = (req, res) => {
  const { title, amount, notes, type } = req.body;
  const transaction = new Transaction({ title, amount, notes, type });
  transaction.save();
  res.send(transaction);
};

module.exports = { addTransaction };
