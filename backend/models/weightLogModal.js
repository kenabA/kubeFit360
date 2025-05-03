import mongoose from 'mongoose';

const weightLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  loggedAt: {
    type: String,
    required: true,
  },
});

export const WeightLog = mongoose.model('WeightLog', weightLogSchema);
