const express = require('express');
const auth = require('middleware/auth');
const validate = require('middleware/validate');
const { validateAccount } = require('models/account');

const router = express.Router();

const getAccounts = require('controllers/accounts/get-all-accounts');
const addAccount = require('controllers/accounts/add-account');
const removeAccount = require('controllers/accounts/remove-account');
router.get('/', auth, getAccounts);

router.post('/', [auth, validate(validateAccount)], addAccount);

router.delete('/:id', auth, removeAccount);

module.exports = router;
