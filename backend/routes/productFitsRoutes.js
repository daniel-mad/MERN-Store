const express = require('express');
const router = express.Router();
const {
  createProductFit,
  getProductFits,
  updateProductFit,
  deleteProductFit,
} = require('../controllers/productFitsController');

router.route('/').post(createProductFit).get(getProductFits);
router.route('/:id').put(updateProductFit).delete(deleteProductFit);

module.exports = router;
