const express = require('express');

const { protect, restrictTo } = require('../controller/authController');
const {
  getAllWorkoutPlanRequests,
  createWorkoutPlanRequests,
  getWorkoutPlanRequest,
  updateWorkoutPlanRequest,
  deleteAllWorkoutPlanRequests,
} = require('../controller/workoutPlanReqController');

const router = express.Router();

router.use(protect);
router.route('/').post(restrictTo('member'), createWorkoutPlanRequests);
router.use(restrictTo('admin', 'trainer', 'member'));
router
  .route('/')
  .get(getAllWorkoutPlanRequests)
  .delete(deleteAllWorkoutPlanRequests);
router.route('/:id').get(getWorkoutPlanRequest).patch(updateWorkoutPlanRequest);

module.exports = router;
