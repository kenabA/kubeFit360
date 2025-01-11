const express = require('express');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  logout,
  authenticateUser,
} = require('../controller/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/authenticateUser', authenticateUser);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

module.exports = router;
