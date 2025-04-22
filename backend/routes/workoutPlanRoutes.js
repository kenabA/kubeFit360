const express = require('express');
const { protect, restrictTo } = require('../controller/authController');
const {
  createWorkoutPlan,
  getWorkoutPlan,
  getAllWorkoutPlan,
  deleteAllWorkoutPlan,
  deleteWorkoutPlan,
  getWorkoutPlanByMemberId,
  // getWorkoutPlanByReqId,
} = require('../controller/workoutPlanController');

const router = express.Router();

router.use(protect);
router
  .route('/')
  .post(restrictTo('trainer'), createWorkoutPlan)
  .get(restrictTo('trainer', 'admin'), getAllWorkoutPlan)
  .delete(restrictTo('trainer', 'admin'), deleteAllWorkoutPlan);

router
  .route('/:id')
  .get(restrictTo('admin', 'trainer', 'member'), getWorkoutPlan)
  .delete(restrictTo('admin', 'trainer'), deleteWorkoutPlan);
router
  .route('/member/:id')
  .get(restrictTo('admin', 'trainer', 'member'), getWorkoutPlanByMemberId);

module.exports = router;
