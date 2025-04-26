const express = require('express');
const { protect, restrictTo } = require('../controller/authController');

const {
  getAllWorkoutPlanTemplates,
  createWorkoutPlanTemplate,
  deleteAllWorkoutPlanTemplate,
  deleteWorkoutPlanTemplate,
} = require('../controller/workoutPlanTemplateController');

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin', 'trainer'));
router
  .route('/')
  .get(getAllWorkoutPlanTemplates)
  .post(createWorkoutPlanTemplate)
  .delete(deleteAllWorkoutPlanTemplate);

router.route('/:id').delete(deleteWorkoutPlanTemplate);

module.exports = router;
