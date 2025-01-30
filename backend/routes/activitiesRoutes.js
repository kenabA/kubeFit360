const express = require('express');

const { protect, restrictTo } = require('../controller/authController');
const {
  getAllRecentActivities,
} = require('../controller/activitiesController');

const router = express.Router();

router.use(protect);
router.use(restrictTo('admin', 'maintainer', 'trainer'));
router.route('/').get(getAllRecentActivities);

module.exports = router;
