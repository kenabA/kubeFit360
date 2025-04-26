const express = require('express');
const {
  addEquipment,
  getAllEquipments,
  getEquipment,
  updateEquipment,
  deleteEquipment,
  getEquipmentStats,
} = require('../controller/equipmentController');
const { protect, restrictTo } = require('../controller/authController');

const router = express.Router();

router.use(protect);

router
  .route('/equipment-stats')
  .get(restrictTo('admin', 'maintainer', 'trainer'), getEquipmentStats);
router
  .route('/')
  .get(restrictTo('admin', 'maintainer', 'trainer'), getAllEquipments);

router
  .route('/:id')
  .get(restrictTo('admin', 'maintainer', 'trainer'), getEquipment);

router.use(restrictTo('admin', 'maintainer'));

router.route('/').post(addEquipment);
router.route('/:id').patch(updateEquipment).delete(deleteEquipment);

module.exports = router;
