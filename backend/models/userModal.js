const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'A user must have a name'] },
    email: {
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
      type: String,
      required: [true, 'Please provide your email'],
    },
    phoneNumber: {
      type: Number,
      required: [true, 'A user must have a phone number'],
    },
    birthDate: Date,

    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: 'Please provide a valid gender',
      },
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'trainer', 'maintainer', 'member'],
        message: 'Please provide a valid role',
      },
      required: [true, 'A user must have a role'],
    },
    joinDate: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      default: 'active',
      enum: {
        values: ['active', 'inactive', 'deleted'],
        message: 'Please provide a valid status',
      },
    },
    address: String,
    password: {
      type: String,
      required: [true, 'A user must have a password'],
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
      required: [true, 'A user must re-type their password'],
    },
    userImage: String,
    passwordChangedAt: Date,
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: Date,
  },
  { timestamps: true },
);

// Runs in between creating the data and saving it to the db
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    // If the password has not been modified, we don't care and simply return
    next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  // Because we do not want to put the confirmedPassword in the database
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Check if the password matches with the login request's pp value
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000 + 1000;
  console.log('Password Reset Expires:', this.passwordResetExpires);
  return resetToken;
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  // If user has changed the password
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimeStamp;
  }
  // False means not changed
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
