const mongoose = require('mongoose');

const workoutPlan = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Template is required'],
    },
    template: {
      type: String,
      required: [true, 'Template is required'],
    },
  },
  { timestamps: true },
);

const WorkoutPlanTemplate = mongoose.model('WorkoutPlanTemplate', workoutPlan);
module.exports = WorkoutPlanTemplate;
