const express = require('express');
const {
  getMaintainer,
  updateMaintainer,
  deleteMaintainer,
  getAllMaintainers,
  addMaintainer,
} = require('../controller/maintainerController');
const router = express.Router();

router.route('/').get(getAllMaintainers).post(addMaintainer);

router
  .route('/:id')
  .get(getMaintainer)
  .patch(updateMaintainer)
  .delete(deleteMaintainer);

module.exports = router;
