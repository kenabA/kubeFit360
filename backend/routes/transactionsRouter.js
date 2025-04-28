const express = require('express');
const { protect } = require('../controller/authController');
const { getAllTransactions } = require('../controller/transactionsController');

const router = express.Router();

router.use(protect);
router.route('/').get(getAllTransactions);

module.exports = router;
