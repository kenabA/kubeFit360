/**
 * @swagger
 * tags:
 *   - name: Maintainers
 *     description: Operations related to maintainers
 *
 * /api/v1/maintainers:
 *   get:
 *     summary: Retrieve a list of users
 *     tags:
 *       - Maintainers
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */

const express = require('express');
const {
  getMaintainer,
  updateMaintainer,
  deleteMaintainer,
  getAllMaintainers,
  addMaintainer,
} = require('../controller/maintainerController');
const { protect } = require('../controller/authController');
const router = express.Router();

router.route('/').get(protect, getAllMaintainers).post(addMaintainer);

router
  .route('/:id')
  .get(getMaintainer)
  .patch(updateMaintainer)
  .delete(deleteMaintainer);

module.exports = router;
