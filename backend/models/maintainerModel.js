const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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

// Check if the password matches with the login request's pp value
maintainerSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Maintainer = mongoose.model('Maintainer', maintainerSchema);

module.exports = Maintainer;
