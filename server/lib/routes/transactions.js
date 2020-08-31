const express = require('express');
const auth = require('middleware/auth');
const validate = require('middleware/validate');
const { validateTransaction } = require('models/transaction');

const {
  getOneTransaction,
} = require('controllers/transactions/get-one-transaction');
const {
  getAllTransactions,
} = require('controllers/transactions/get-all-transactions');
const { addTransaction } = require('controllers/transactions/add-transaction');
const {
  removeTransaction,
} = require('controllers/transactions/remove-transaction');

const router = express.Router();

router.get('/', auth, getAllTransactions);

router.get('/:id', auth, getOneTransaction);

router.post('/', [auth, validate(validateTransaction)], addTransaction);

router.delete('/:id', auth, removeTransaction);

module.exports = router;
