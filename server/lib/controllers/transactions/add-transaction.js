const { Transaction } = require('models/transaction');

const addTransaction = (req, res) => {
  const { title, amount, notes, type } = req.body;
  const { _id } = req.user;
  const transaction = new Transaction({
    title,
    amount,
    notes,
    type,
    user: _id,
  });
  transaction.save();
  res.send(transaction);
};

module.exports = { addTransaction };
