const express = require('express');
const { protect, restrictTo } = require('../controller/authController');
const {
  createWorkoutPlan,
  getWorkoutPlan,
  getAllWorkoutPlan,
  deleteAllWorkoutPlan,
  deleteWorkoutPlan,
  getWorkoutPlanByMemberId,
  getMonthlyStatsByTrainer,
  // getWorkoutPlanByReqId,
} = require('../controller/workoutPlanController');

const router = express.Router();

router.use(protect);
router
  .route('/')
  .post(restrictTo('trainer'), createWorkoutPlan)
  .get(restrictTo('trainer', 'admin', 'member'), getAllWorkoutPlan)
  .delete(restrictTo('trainer', 'admin'), deleteAllWorkoutPlan);

router.route('/stats').get(restrictTo('trainer'), getMonthlyStatsByTrainer);

router
  .route('/:id')
  .get(restrictTo('member', 'admin', 'trainer'), getWorkoutPlan)
  .delete(restrictTo('admin', 'trainer', 'member'), deleteWorkoutPlan);

router.route('/member/:id').get(
  restrictTo('admin', 'trainer', 'member'),

  getWorkoutPlanByMemberId,
);

module.exports = router;
