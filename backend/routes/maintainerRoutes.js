const express = require('express');
const {
  getMaintainer,
  updateMaintainer,
  deleteMaintainer,
  getAllMaintainers,
  addMaintainer,
} = require('../controller/maintainerController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require('../controller/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.route('/').get(getAllMaintainers).post(addMaintainer);

router
  .route('/:id')
  .get(getMaintainer)
  .patch(updateMaintainer)
  .delete(deleteMaintainer);

module.exports = router;
