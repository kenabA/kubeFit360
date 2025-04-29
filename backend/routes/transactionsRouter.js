const express = require('express');
const { protect } = require('../controller/authController');
const {
  getAllTransactions,
  deleteAllTransactions,
} = require('../controller/transactionsController');

const router = express.Router();

router.use(protect);
router.route('/').get(getAllTransactions).delete(deleteAllTransactions);

module.exports = router;
