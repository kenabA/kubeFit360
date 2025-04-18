const express = require('express');
const { protect } = require('../controller/authController');
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
router.route('/').get(getAllNotices);
router.route('/:id').get(getNotice);
// router.use(restrictTo('admin'));
router.route('/').post(addNotice).delete(deleteAllNotice);
router.route('/:id').delete(deleteNotice).patch(updateNotice);

module.exports = router;
