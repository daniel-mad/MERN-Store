const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

router.route('/').post(createCategory).get(getCategory);
router.route('/:id').put(updateCategory).delete(deleteCategory);

module.exports = router;
