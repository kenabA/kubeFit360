const express = require('express');
const {
  getUser,
  deleteUser,
  getAllUsers,
  updateMe,
  updateUser,
} = require('../controller/userController');
const {
  updatePassword,
  protect,
  restrictTo,
} = require('../controller/authController');
const router = express.Router();

router.patch('/updateMe', protect, updateMe);
router.patch('/updatePassword', protect, updatePassword);

router.route('/').get(protect, restrictTo('admin'), getAllUsers);
router
  .route('/:id')
  .get(protect, restrictTo('admin'), getUser)
  .patch(protect, restrictTo('admin'), updateUser)
  .delete(protect, restrictTo('admin'), deleteUser);

module.exports = router;
