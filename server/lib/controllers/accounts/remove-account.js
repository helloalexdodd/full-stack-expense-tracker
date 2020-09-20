const { Account } = require('models/account');
const { User } = require('models/user');
const { Transaction } = require('models/transaction');

const removeAccount = async (req, res) => {
  const { id } = req.params;

  const transactions = await Transaction.findOne({ account: id });

  if (transactions)
    return res.status(409).send({
      message:
        'You have transactions associated with this account. It cannot be deleted.',
    });

  const user = await User.findOne({ accounts: id });
  user.transactions = user.transactions.filter((t) => t !== id);
  await user.save();

  const account = await Account.findByIdAndRemove({ _id: id });
  res.send(account);
};

module.exports = removeAccount;
