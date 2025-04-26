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

router
  .route('/')
  .get(restrictTo('admin'), getAllUsers)
  .post(restrictTo('admin'), addUser);
router.route('/user-stats').get(restrictTo('admin'), getClientStats);

// router.use(restrictTo('admin'));

router.route('/maintainers').get(getUsersByRole('maintainer'));

router.route('/trainers').get(getUsersByRole('trainer'));

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
