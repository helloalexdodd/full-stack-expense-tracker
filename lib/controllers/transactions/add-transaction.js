const { Transaction, validateTransaction } = require('models/transaction');

const addTransaction = (req, res) => {
  const { text, amount, createdAt } = req.body;

  const transaction = new Transaction({
    text,
    amount,
    createdAt: createdAt ? createdAt : null,
  });

  transaction.save();
  res.send(transaction);
};

module.exports = { addTransaction };
