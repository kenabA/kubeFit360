const express = require('express');
const {
  // signup,
  login,
  forgotPassword,
  resetPassword,
  logout,
  authenticateUser,
  signupMemberRequest,
} = require('../controller/authController');

const router = express.Router();

// Change the route of sign up to request
router.post('/signupRequest', signupMemberRequest);
router.post('/login', login);
router.get('/logout', logout);
router.get('/authenticateUser', authenticateUser);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

module.exports = router;
