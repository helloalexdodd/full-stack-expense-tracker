const { Transaction } = require('models/transaction');
const { User } = require('models/user');
const { Account } = require('models/account');

const addTransaction = async (req, res) => {
  const { account, description, amount, notes, type, user } = req.body;

  const transaction = new Transaction({
    account,
    description,
    amount,
    notes,
    type,
    user,
  });

  await transaction.save();

  const databaseAccount = await Account.findOne({ _id: account });
  transaction.account = databaseAccount._id;
  await transaction.save();

  const userModel = await User.findOne({ _id: user });
  userModel.transactions.push(transaction._id);
  await userModel.save();

  const newTransaction = await Transaction.findOne({
    _id: transaction._id,
  }).populate('account', 'name');

  res.send(newTransaction);
};

module.exports = addTransaction;
