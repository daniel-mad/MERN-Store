const express = require('express');
const router = express.Router();
const {
  createBrand,
  getAllBrands,
  updateBrand,
  deleteBrand,
} = require('../controllers/brandController');

router.route('/').post(createBrand).get(getAllBrands);
router.route('/:id').put(updateBrand).delete(deleteBrand);

module.exports = router;
