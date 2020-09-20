const { Transaction } = require('models/transaction');

const getOneTransaction = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id).select('-__v');
  if (!transaction) return res.status(404).send('No transactions found.');
  res.send(transaction);
};

module.exports = getOneTransaction;
