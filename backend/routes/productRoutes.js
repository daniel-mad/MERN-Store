const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  searchProducts,
  searchProductsByName,
} = require('../controllers/productController');

router.route('/searchByName').get(searchProductsByName);
router.route('/search').get(searchProducts);
router.route('/').post(createProduct).get(getAllProducts);
router.route('/:id').get(getProduct).put(updateProduct).post(deleteProduct);

module.exports = router;
