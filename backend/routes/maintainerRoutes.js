const express = require('express');
const {
  getMaintainer,
  updateMaintainer,
  deleteMaintainer,
  getAllMaintainers,
  addMaintainer,
} = require('../controller/maintainerController');
const { signup, login } = require('../controller/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.route('/').get(getAllMaintainers).post(addMaintainer);

router
  .route('/:id')
  .get(getMaintainer)
  .patch(updateMaintainer)
  .delete(deleteMaintainer);

module.exports = router;
