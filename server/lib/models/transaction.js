const { Schema, model } = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const transactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  showDetails: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  editNote: {
    type: Boolean,
    default: false,
  },
});

const Transaction = model('Transaction', transactionSchema);

const validateTransaction = (req) => {
  const schema = Joi.object({
    user: Joi.objectId().required(),
    account: Joi.objectId().required(),
    description: Joi.string().max(25).required(),
    amount: Joi.number().min(0).max(999999).precision(2).required(),
    notes: Joi.string().allow(''),
    showDetails: Joi.boolean(),
    type: Joi.string().valid('income', 'expense').required(),
    createdAt: Joi.date(),
  });
  return schema.validate(req);
};

module.exports = {
  transactionSchema,
  Transaction,
  validateTransaction,
};
