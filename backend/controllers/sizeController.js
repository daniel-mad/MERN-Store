const Size = require('../models/Size');

const createSize = async (req, res) => {
  try {
    const size = new Size({ ...req.body });
    await size.save();
    res.status(201).json(size);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const getSize = async (req, res) => {
  try {
    const sizes = await Size.find({});
    res.status(200).json(sizes);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const updateSize = async (req, res) => {
  try {
    const size = await Size.findOne({ _id: req.params.id });
    if (!size) return res.status(404).json({ message: 'Not Found' });
    size.name = req.body.name;
    await size.save();
    res.status(200).json(size);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const deleteSize = async (req, res) => {
  try {
    const size = await Size.findOneAndDelete({ _id: req.params.id });
    if (!size) return res.status(404).json({ message: 'Not Found' });
    res.status(200).json(size);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createSize,
  getSize,
  updateSize,
  deleteSize,
};
