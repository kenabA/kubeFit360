const express = require('express');
const {
  getUser,
  deleteUser,
  getAllUsers,
  updateMe,
  updateUser,
  getMe,
  getClientStats,
  getUsersByRole,
  addUser,
} = require('../controller/userController');
const {
  updatePassword,
  protect,
  restrictTo,
} = require('../controller/authController');
const router = express.Router();

router.use(protect);

router.get('/me', getMe, getUser);

router.patch('/updateMe', updateMe);
router.patch('/updatePassword', updatePassword);

router.route('/').get(getAllUsers).post(addUser);
router.route('/user-stats').get(restrictTo('admin'), getClientStats);

router
  .route('/maintainers')
  .get(restrictTo('admin'), getUsersByRole('maintainer'));

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
