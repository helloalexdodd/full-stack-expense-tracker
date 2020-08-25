const express = require('express');
const auth = require('middleware/auth');

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

router.get('/', /*auth,*/ getAllTransactions);

router.get('/:id', /*auth,*/ getOneTransaction);

router.post('/', /*auth,*/ addTransaction);

router.delete('/:id', /*auth,*/ removeTransaction);

module.exports = router;
