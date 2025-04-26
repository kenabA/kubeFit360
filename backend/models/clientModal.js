// models/clientModel.js
const mongoose = require('mongoose');
const User = require('./userModal');

// Create a schema only for Client-specific fields
const clientSchema = new mongoose.Schema({
  renewalDate: {
    type: Date,
  },
  membershipType: {
    type: String,
    enum: ['basic', 'enterprise'],
    required: [true, 'Client must have a membership type'],
  },
  active: {
    type: Boolean,
    default: false,
  },
});

// Create a discriminator (inherits User model)
const Client = User.discriminator('Client', clientSchema);

module.exports = Client;
