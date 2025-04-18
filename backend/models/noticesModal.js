const mongoose = require('mongoose');

const workoutPlan = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please specify the title of the notice'],
    },
    description: {
      type: String,
      required: [true, 'Please brief about the notice'],
      maxLength: 500,
    },
    representativeImg: {
      type: String,
    },
    expiresAt: {
      type: String,
      required: [true, 'Please specify the expiry date'],
    },
  },
  { timestamps: true },
);

const Notice = mongoose.model('Notice', workoutPlan);
module.exports = Notice;
