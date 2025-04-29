const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'Client',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ['PENDING', 'COMPLETE', 'FAILED', 'REFUNDED'],
      default: 'PENDING',
    },
    paymentGateway: {
      type: String,
      enum: ['eSewa', 'Khalti'],
    },
    planType: {
      type: String,
      required: true,
      enum: ['basic', 'enterprise'],
    },
    transaction_uuid: {
      type: String,
      required: true,
      unique: true,
    },

    paidAt: {
      type: Date, // Set when payment is successful
    },
    expiresOn: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
