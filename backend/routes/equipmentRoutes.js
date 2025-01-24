const express = require('express');
const {
  addEquipment,
  getAllEquipments,
  getEquipment,
  updateEquipment,
  deleteEquipment,
} = require('../controller/equipmentController');
const { protect, restrictTo } = require('../controller/authController');
const router = express.Router();

router.use(protect);
router.use(restrictTo('admin', 'maintainer'));

router.route('/').get(getAllEquipments).post(addEquipment);

router
  .route('/:id')
  .get(getEquipment)
  .patch(updateEquipment)
  .delete(deleteEquipment);

module.exports = router;
