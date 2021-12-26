const Category = require('../models/Category');

const createCategory = async (req, res) => {
  try {
    const category = new Category({ ...req.body });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const getCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) return res.status(404).json({ message: 'Not Found' });
    category.name = req.body.name;
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id });
    if (!category) return res.status(404).json({ message: 'Not Found' });
    res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
