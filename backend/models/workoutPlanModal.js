const mongoose = require('mongoose');

const workoutPlan = new mongoose.Schema(
  {
    request: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'WorkoutPlanRequests',
    },
    workoutPlan: {
      type: String,
      required: [true, 'Workout Plan is required'],
    },
  },

  { timestamps: true },
);

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlan);
module.exports = WorkoutPlan;
