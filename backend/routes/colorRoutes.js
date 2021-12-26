const express = require('express');
const router = express.Router();
const {
  createColor,
  getColor,
  updateColor,
  deleteColor,
} = require('../controllers/colorController');

router.route('/').post(createColor).get(getColor);
router.route('/:id').put(updateColor).delete(deleteColor);

module.exports = router;
