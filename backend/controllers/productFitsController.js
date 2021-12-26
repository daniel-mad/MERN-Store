const ProductFit = require('../models/ProductFit');

const createProductFit = async (req, res) => {
  try {
    const productFit = new ProductFit({ ...req.body });
    await productFit.save();
    res.status(201).json(productFit);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const getProductFits = async (req, res) => {
  try {
    const productFits = await ProductFit.find({});
    res.status(200).json(productFits);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const updateProductFit = async (req, res) => {
  try {
    const productFit = await ProductFit.findOne({ _id: req.params.id });
    if (!productFit) return res.status(404).json({ message: 'Not Found' });
    productFit.name = req.body.name;
    await productFit.save();
    res.status(200).json(productFit);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const deleteProductFit = async (req, res) => {
  try {
    const productFit = await ProductFit.findOneAndDelete({
      _id: req.params.id,
    });
    if (!productFit) return res.status(404).json({ message: 'Not Found' });
    res.status(200).json(productFit);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createProductFit,
  getProductFits,
  updateProductFit,
  deleteProductFit,
};
