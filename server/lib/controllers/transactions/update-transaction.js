const { Transaction } = require('models/transaction');

const updateTransaction = async (req, res) => {
  const { account, description, amount, notes, type, user } = req.body;

  const transaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    { account, description, amount, notes, type, user },
    { new: true }
  ).populate('account');
  if (!transaction) return res.status(404).send('No transactions found.');

  res.send(transaction);
};

module.exports = updateTransaction;
