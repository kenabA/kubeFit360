const express = require('express');

const { protect, restrictTo } = require('../controller/authController');
const {
  getAllWorkoutPlanRequests,
  createWorkoutPlanRequests,
  getWorkoutPlanRequest,
  updateWorkoutPlanRequest,
  deleteAllWorkoutPlanRequests,
  deleteWorkoutPlanRequest,
} = require('../controller/workoutPlanReqController');

const router = express.Router();

router.use(protect);
router.route('/').post(restrictTo('member'), createWorkoutPlanRequests);
router.use(restrictTo('admin', 'trainer'));
router
  .route('/')
  .get(getAllWorkoutPlanRequests)
  .delete(deleteAllWorkoutPlanRequests);
router
  .route('/:id')
  .get(getWorkoutPlanRequest)
  .patch(updateWorkoutPlanRequest)
  .delete(deleteWorkoutPlanRequest);

module.exports = router;
