const express = require('express');
const {
  inputWeight,
  getWeights,
  seedLast6MonthsWeights,
  deleteAllWeights,
} = require('../controller/weightLogController');
const {
  protect,
  restrictTo,
  checkMembership,
} = require('../controller/authController');
const router = express.Router();

router.use(protect);

router
  .route('/')
  .post(restrictTo('member'), checkMembership, inputWeight)
  .get(checkMembership, getWeights)
  .delete(deleteAllWeights);

router.post('/seed-last-6-months', seedLast6MonthsWeights);

module.exports = router;
