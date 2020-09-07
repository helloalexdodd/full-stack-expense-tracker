const { Schema, model } = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const transactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
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
  type: {
    type: String,
    required: true,
  },
  showDetails: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = model('Transaction', transactionSchema);

const validateTransaction = (req) => {
  const schema = Joi.object({
    user: Joi.objectId(),
    title: Joi.string().max(25).required(),
    amount: Joi.number().min(0).max(999999).precision(2).positive().required(),
    notes: Joi.string().max(200),
    type: Joi.string().valid('income', 'expense').required(),
    showDetails: Joi.boolean(),
    createdAt: Joi.date(),
  });
  return schema.validate(req);
};

module.exports = {
  transactionSchema,
  Transaction,
  validateTransaction,
};
