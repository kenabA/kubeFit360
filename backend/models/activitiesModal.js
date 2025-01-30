const mongoose = require('mongoose');

const recentActivitySchema = new mongoose.Schema({
  activist: {
    type: String,
    required: true,
  },
  entity: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Equipment',
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'underMaintenance'],
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const RecentActivity = mongoose.model('RecentActivity', recentActivitySchema);

module.exports = RecentActivity;
