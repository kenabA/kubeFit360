const express = require('express');
const {
  protect,
  restrictTo,
  checkMembership,
} = require('../controller/authController');
const {
  getAllNotices,
  addNotice,
  deleteNotice,
  deleteAllNotice,
  updateNotice,
  getNotice,
} = require('../controller/noticesController');

const router = express.Router();

router.use(protect);
router.route('/').get(checkMembership, getAllNotices);
router.route('/:id').get(checkMembership, getNotice);
router.use(restrictTo('admin'));
router.route('/').post(addNotice).delete(deleteAllNotice);
router.route('/:id').delete(deleteNotice).patch(updateNotice);

module.exports = router;
