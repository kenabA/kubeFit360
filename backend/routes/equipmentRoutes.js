const express = require('express');
const {
  addEquipment,
  getAllEquipments,
  getEquipment,
  updateEquipment,
  deleteEquipment,
  getEquipmentStats,
  getAllRecommendedEquipments,
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
  .route('/recommended')
  .get(restrictTo('admin', 'maintainer'), getAllRecommendedEquipments);

router
  .route('/:id')
  .get(restrictTo('admin', 'maintainer', 'trainer'), getEquipment);

router
  .route('/')
  .post(restrictTo('admin', 'maintainer', 'trainer'), addEquipment);
router
  .route('/:id')
  .patch(restrictTo('admin', 'maintainer'), updateEquipment)
  .delete(restrictTo('admin', 'maintainer'), deleteEquipment);

module.exports = router;
