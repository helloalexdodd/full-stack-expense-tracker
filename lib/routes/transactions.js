const express = require('express');
const auth = require('middleware/auth');

const {
  getTransactions,
} = require('controllers/transactions/get-transactions');
const { addTransaction } = require('controllers/transactions/add-transaction');
const {
  removeTransaction,
} = require('controllers/transactions/remove-transaction');

const router = express.Router();

router.get('/', auth, getTransactions);

router.post('/', auth, addTransaction);

router.delete('/', auth, removeTransaction);

module.exports = router;
