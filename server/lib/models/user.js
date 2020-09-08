const { Schema, model } = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const passwordComplexity = require('joi-password-complexity');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
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
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
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

userSchema.methods.hasExpired = function () {
  const now = Date.now();
  return now - Date.parse(this.resetPasswordExpires) > 3600000; // One hour
};

const User = model('User', userSchema);

const validateUser = (req) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity(),
    resetPasswordToken: Joi.string().min(20).max(20),
    resetPasswordExpires: Joi.date(),
  });
  return schema.validate(req);
};

const validatePassword = (req) => {
  const schema = Joi.object({
    password: passwordComplexity(),
  });
  return schema.validate(req);
};

module.exports = {
  userSchema,
  User,
  validateUser,
  validatePassword,
};
