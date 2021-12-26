const express = require('express');
const router = express.Router();
const {
  createSize,
  getSize,
  updateSize,
  deleteSize,
} = require('../controllers/sizeController');

router.route('/').post(createSize).get(getSize);
router.route('/:id').put(updateSize).delete(deleteSize);

module.exports = router;
