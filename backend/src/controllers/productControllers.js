const Product = require('../models/Product');
const { validationResult } = require('express-validator');

// Get products with pagination and filters
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.q) {
      query.$text = { $search: req.query.q };
    }

    const [products, total] = await Promise.all([
      Product.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Product.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: products,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching products' }
    });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: { message: 'Product not found' }
      });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching product' }
    });
  }
};

// Create product (admin)
exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: { message: 'Validation error', details: errors.array() }
    });
  }

  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error creating product' }
    });
  }
};

// Update product (admin)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: { message: 'Product not found' }
      });
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error updating product' }
    });
  }
};

// Delete product (admin)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: { message: 'Product not found' }
      });
    }
    
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error deleting product' }
    });
  }
};