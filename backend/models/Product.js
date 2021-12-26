const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
    image: {
      type: String,
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Color',
    },
    size: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Size',
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Brand',
    },
    product_fit: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'ProductFit',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamp: true,
  }
);

// productSchema.virtual('colors', {
//   ref: 'Color',
//   localField: 'name',
//   foreignField: 'color',
// });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
