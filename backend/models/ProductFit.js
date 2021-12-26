const mongoose = require('mongoose');

const productFitSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const ProductFit = mongoose.model('ProductFit', productFitSchema);
module.exports = ProductFit;
