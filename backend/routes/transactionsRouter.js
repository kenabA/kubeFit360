const express = require('express');
const { protect } = require('../controller/authController');
const {
  getAllTransactions,
  deleteAllTransactions,
  getLast6MonthsRevenue,
} = require('../controller/transactionsController');

const router = express.Router();

router.use(protect);
router.route('/').get(getAllTransactions).delete(deleteAllTransactions);
router.route('/get-aggregated-transactions').get(getLast6MonthsRevenue);

module.exports = router;
