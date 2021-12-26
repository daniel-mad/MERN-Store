const Color = require('../models/Color');

const createColor = async (req, res) => {
  try {
    const color = new Color({ ...req.body });
    await color.save();
    res.status(201).json(color);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const getColor = async (req, res) => {
  try {
    const colors = await Color.find({});
    res.status(200).json(colors);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const updateColor = async (req, res) => {
  try {
    const color = await Color.findOne({ _id: req.params.id });
    if (!color) return res.status(404).json({ message: 'Not Found' });
    color.name = req.body.name;
    await color.save();
    res.status(200).json(color);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const deleteColor = async (req, res) => {
  try {
    const color = await Color.findOneAndDelete({ _id: req.params.id });
    if (!color) return res.status(404).json({ message: 'Not Found' });
    res.status(200).json(color);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createColor,
  getColor,
  updateColor,
  deleteColor,
};
