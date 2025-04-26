const mongoose = require('mongoose');

const workoutPlanRequests = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    height: {
      feet: { type: Number, required: [true, 'Feet not specified'] },
      inches: { type: Number, required: [true, 'Inches not specified'] },
    },
    weight: {
      type: Number,
      required: [true, 'Weight not specified'],
    },
    status: {
      type: String,
      default: 'pending',
      enum: {
        values: ['approved', 'rejected', 'pending', 'generated'],
        message: 'Please provide a valid status.',
      },
    },
    fitnessLevel: {
      type: String,
      enum: {
        values: ['beginner', 'intermediate', 'professional'],
        message: 'Please provide a valid fitness level',
      },
      required: [true, 'Do specify your fitness level.'],
    },
    bodyType: {
      enum: {
        values: ['ectomorph', 'mesomorph', 'endomorph'],
        message: 'Please provide a valid body type',
      },
      type: String,
    },
    workoutTypePreference: {
      enum: {
        values: ['strength training', 'cardio', 'flexibility'],
        message: 'Please provide a valid workout type',
      },
      type: [String],
      required: [true, 'Do specify your workout type preference.'],
    },
    workoutGoals: {
      type: [String],
      enum: {
        values: [
          'Fat Loss',
          'Muscle Gain',
          'Strength',
          'Endurance',
          'General Fitness',
        ],
        message: 'Please provide a valid week day',
      },
      required: true,
    },
    preferredWorkoutDays: {
      enum: {
        values: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        message: 'Please provide a valid week day',
      },
      type: [String],
      required: [true, 'Do specify your preferred workout days.'],
    },
    additionalNotes: {
      type: String,
      maxLength: 500,
    },
    generatedPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkoutPlan',
    },
  },
  { timestamps: true },
);

const WorkoutPlanRequests = mongoose.model(
  'WorkoutPlanRequests',
  workoutPlanRequests,
);
module.exports = WorkoutPlanRequests;
