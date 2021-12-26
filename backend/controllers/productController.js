const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Server Error', error: error.message });
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ active: true }, { __v: 0 });
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const updateProduct = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) return res.status(404).json({ message: 'Not Found' });
    updates.forEach(update => (product[update] = req.body[update]));
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not Found' });
    product.active = false;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

const searchProducts = async (req, res) => {
  try {
    const filter = {};
    for (const [key, val] of Object.entries(req.query)) {
      filter[key] = val.toLowerCase().split(',');
    }

    const products = await Product.aggregate([
      {
        $lookup: {
          from: 'colors',
          localField: 'color',
          foreignField: '_id',
          as: 'color',
        },
      },
      { $unwind: '$color' },
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brand',
        },
      },
      { $unwind: '$brand' },
      {
        $lookup: {
          from: 'sizes',
          localField: 'size',
          foreignField: '_id',
          as: 'size',
        },
      },
      { $unwind: '$size' },
      {
        $lookup: {
          from: 'productfits',
          localField: 'product_fit',
          foreignField: '_id',
          as: 'product_fit',
        },
      },
      { $unwind: '$product_fit' },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },
      {
        $project: {
          product_id: '$product_id',
          name: '$name',
          price: '$price',
          image: '$image',
          color: { $toLower: '$color.name' },
          size: { $toLower: '$size.name' },
          brand: { $toLower: '$brand.name' },
          product_fit: { $toLower: '$product_fit.name' },
          category: { $toLower: '$category.name' },
          active: '$active',
        },
      },
      {
        $match: {},
      },
    ]);

    const filtered_products = products.filter(p => {
      if (filter.product_fit) {
        if (!filter.product_fit.includes(p.product_fit)) return false;
      }
      if (filter.size) {
        if (!filter.size.includes(p.size)) return false;
      }
      if (filter.color) {
        if (!filter.color.includes(p.color)) return false;
      }
      if (filter.brand) {
        if (!filter.brand.includes(p.brand)) return false;
      }
      if (filter.category) {
        if (!filter.category.includes(p.category)) return false;
      }
      if (p.active === false) return false;
      return true;
    });

    return res.status(200).json(filtered_products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

const searchProductsByName = async (req, res) => {
  try {
    const name = req.query.name;

    const products = await Product.aggregate([
      {
        $lookup: {
          from: 'colors',
          localField: 'color',
          foreignField: '_id',
          as: 'color',
        },
      },
      { $unwind: '$color' },
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brand',
        },
      },
      { $unwind: '$brand' },
      {
        $lookup: {
          from: 'sizes',
          localField: 'size',
          foreignField: '_id',
          as: 'size',
        },
      },
      { $unwind: '$size' },
      {
        $lookup: {
          from: 'productfits',
          localField: 'product_fit',
          foreignField: '_id',
          as: 'product_fit',
        },
      },
      { $unwind: '$product_fit' },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },
      {
        $project: {
          product_id: '$product_id',
          name: '$name',
          price: '$price',
          image: '$image',
          color: { $toLower: '$color.name' },
          size: { $toLower: '$size.name' },
          brand: { $toLower: '$brand.name' },
          product_fit: { $toLower: '$product_fit.name' },
          category: { $toLower: '$category.name' },
          active: '$active',
        },
      },
      {
        $match: { name: { $regex: new RegExp(name, 'i') }, active: true },
      },
    ]);

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  searchProducts,
  searchProductsByName,
};
