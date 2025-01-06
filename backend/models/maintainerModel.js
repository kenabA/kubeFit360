const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const maintainerSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'A maintainer must have a name'] },
  email: {
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    type: String,
    required: [true, 'Please provide your email'],
  },
  phoneNumber: {
    type: Number,
    required: [true, 'A maintainer must have a phone number'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'others'],
      message: 'Please provide a valid gender',
    },
    required: [true, 'A maintainer must have a gender'],
  },
  hiredAt: {
    type: Date,
    default: Date.now(),
  },
  status: { type: Boolean, default: true, select: false },
  address: String,
  password: {
    type: String,
    required: [true, 'A maintainer must have a password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      // Works only on Create or Save
      validator: function (value) {
        return this.password === value;
      },
      message: 'Passwords do not match',
    },
    required: [true, 'A maintainer must re-type their password'],
  },
  photo: { type: String },
  passwordChangedAt: { type: Date, select: false },
  passwordResetToken: { type: String, select: false },
  passwordResetExpires: Date,
});

// Runs in between creating the data and saving it to the db
maintainerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    // If the password has not been modified, we don't care and simply return
    next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  // Because we do not want to put the confirmedPassword in the database
  this.passwordConfirm = undefined;
  next();
});

maintainerSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000;
});

// Check if the password matches with the login request's pp value
maintainerSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

maintainerSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000 + 1000;
  console.log('Password Reset Expires:', this.passwordResetExpires);
  return resetToken;
};

const Maintainer = mongoose.model('Maintainer', maintainerSchema);

module.exports = Maintainer;
