const { Schema, model } = require('mongoose');
const Joi = require('joi');

const transactionSchema = new Schema({
  text: {
    type: String,
    trim: true,
    required: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = model('Transaction', transactionSchema);

const validateTransaction = (req) => {
  const schema = Joi.object({
    text: Joi.string().require(),
    amount: Joi.number().min(0).max(999999).precision(2).positive().require(),
    createdAt: Joi.Date(),
  });
  return schema.validate(req);
};

module.exports = {
  transactionSchema,
  Transaction,
  validateTransaction,
};
