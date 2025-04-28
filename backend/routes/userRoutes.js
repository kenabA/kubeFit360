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
  getAllClients,
  processClientRequest,
} = require('../controller/userController');
const {
  updatePassword,
  protect,
  restrictTo,
} = require('../controller/authController');
const {
  EsewaInitiatePayment,
  paymentStatus,
} = require('../controller/esewaController');
const router = express.Router();

router.route('/initiate-payment').post(EsewaInitiatePayment);
router.route('/payment-status').post(paymentStatus);

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

router.route('/clients').get(getAllClients());

router.route('/trainers').get(getUsersByRole('trainer'));

router
  .route('/processClientRequest/:id')
  .patch(restrictTo('admin'), processClientRequest);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
