const express = require('express');
const {
  getUser,
  deleteUser,
  getAllUsers,
  updateMe,
  updateUser,
  getMe,
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

router.use(restrictTo('admin'));
router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
