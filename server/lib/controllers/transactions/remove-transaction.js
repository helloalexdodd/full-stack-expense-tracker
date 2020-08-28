const { Transaction } = require('models/transaction');

const removeTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id).select('-__v');
  if (!transaction) return res.status(404).send('No transactions found.');
  await transaction.remove();
  res.send(transaction);
};

module.exports = { removeTransaction };
