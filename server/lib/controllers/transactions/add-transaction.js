const { User } = require('models/user');
const { Transaction } = require('models/transaction');

const addTransaction = async (req, res) => {
  const { title, amount, notes, type } = req.body;
  const { _id } = req.user;
  const transaction = new Transaction({
    title,
    amount,
    notes,
    type,
    user: _id,
  });
  await transaction.save();

  const user = await User.findOne({ _id });
  user.transactions.push(transaction._id);
  await user.save();

  res.send(transaction);
};

module.exports = { addTransaction };
