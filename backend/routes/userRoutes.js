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
  checkNewUser,
} = require('../controller/userController');
const {
  updatePassword,
  protect,
  restrictTo,
  setPassword,
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
router.get('/check-new-user', getMe, checkNewUser);

router.patch('/updateMe', updateMe);
router.patch('/updatePassword', updatePassword);
router.patch('/setPassword', setPassword);

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
