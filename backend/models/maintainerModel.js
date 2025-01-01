const mongoose = require('mongoose');
const validator = require('validator');

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
  confirmPassword: {
    type: String,
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: 'Passwords do not match',
    },
    required: [true, 'A maintainer must re-type their password'],
  },
  photo: { type: String },
});

const Maintainer = mongoose.model('Maintainer', maintainerSchema);

module.exports = Maintainer;
