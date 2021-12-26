const Brand = require('../models/Brand');

const createBrand = async (req, res) => {
  try {
    const brand = new Brand({ ...req.body });
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).json(brands);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findOne({ _id: req.params.id });
    if (!brand) return res.status(404).json({ message: 'Not Found' });
    brand.name = req.body.name;
    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findOneAndDelete({ _id: req.params.id });
    if (!brand) return res.status(404).json({ message: 'Not Found' });
    res.status(200).json(brand);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createBrand,
  getAllBrands,
  updateBrand,
  deleteBrand,
};
