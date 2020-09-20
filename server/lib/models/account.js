const { Schema, model } = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const accountSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    require: true,
  },
});

const Account = model('Account', accountSchema);

const validateAccount = (req) => {
  const schema = Joi.object({
    user: Joi.objectId(),
    name: Joi.string().required(),
  });
  return schema.validate(req);
};

module.exports = {
  accountSchema,
  Account,
  validateAccount,
};
