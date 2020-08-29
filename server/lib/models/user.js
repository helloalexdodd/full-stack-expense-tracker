const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    isRequired: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    isRequired: true,
    lowercase: true,
    trim: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    isRequired: true,
    trim: true,
  },
  isAdmin: Boolean,
  // loginAttempts: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  // lockUntil: Number,
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get('jwtPrivateKey')
  );
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

const validateUser = (req) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity(),
  });
  return schema.validate(req);
};

module.exports = {
  userSchema,
  User,
  validateUser,
};
