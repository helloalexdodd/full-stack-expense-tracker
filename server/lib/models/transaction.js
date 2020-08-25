const { Schema, model } = require('mongoose');
const Joi = require('joi');

const transactionSchema = new Schema({
  category: {
    type: String,
  },
  title: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = model('Transaction', transactionSchema);

const validateTransaction = (req) => {
  const schema = Joi.object({
    title: Joi.string().max(25).required(),
    amount: Joi.number().min(0).max(999999).precision(2).positive().require(),
    notes: Joi.string().max(200),
    createdAt: Joi.Date(),
  });
  return schema.validate(req);
};

module.exports = {
  transactionSchema,
  Transaction,
  validateTransaction,
};
