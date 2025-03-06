const express = require('express');
const { protect, restrictTo } = require('../controller/authController');
const {
  createWorkoutPlan,
  getWorkoutPlan,
  getAllWorkoutPlan,
  deleteAllWorkoutPlan,
} = require('../controller/workoutPlanController');

const router = express.Router();

router.use(protect);
router
  .route('/')
  .post(restrictTo('trainer'), createWorkoutPlan)
  .get(getAllWorkoutPlan)
  .delete(deleteAllWorkoutPlan);
router.use(restrictTo('admin', 'trainer', 'member'));
router.route('/:id').get(getWorkoutPlan);

module.exports = router;
