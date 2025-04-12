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
  .get(getAllWorkoutPlan)
  .delete(deleteAllWorkoutPlan);
router.use(restrictTo('admin', 'trainer', 'member'));
router.route('/:id').get(getWorkoutPlan).delete(deleteWorkoutPlan);
router.route('/member/:id').get(getWorkoutPlanByMemberId);

module.exports = router;
