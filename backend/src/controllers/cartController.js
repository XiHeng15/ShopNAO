const { validationResult } = require('express-validator');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
                        .populate('items.product');
    
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching cart' }
    });
  }
};

exports.addToCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: { message: 'Validation error', details: errors.array() }
    });
  }

  try {
    const { productId, qty } = req.body;

    // Get product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: { message: 'Product not found' }
      });
    }

    // Check stock
    if (product.stock < qty) {
      return res.status(400).json({
        success: false,
        error: { message: 'Not enough stock available' }
      });
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    // Check if product already in cart
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity if product exists
      cart.items[itemIndex].qty = qty;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        name: product.name,
        priceCents: product.priceCents,
        qty
      });
    }

    await cart.save();
    
    // Populate product details
    await cart.populate('items.product');

    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error adding to cart' }
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: { message: 'Cart not found' }
      });
    }

    cart.items = cart.items.filter(
      item => item._id.toString() !== req.params.itemId
    );

    await cart.save();
    await cart.populate('items.product');

    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error removing from cart' }
    });
  }
};

exports.updateCartItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: { message: 'Validation error', details: errors.array() }
    });
  }

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        error: { message: 'Cart not found' }
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === req.params.itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: { message: 'Item not found in cart' }
      });
    }

    // Check stock
    const product = await Product.findById(cart.items[itemIndex].product);
    if (!product || product.stock < req.body.qty) {
      return res.status(400).json({
        success: false,
        error: { message: 'Not enough stock available' }
      });
    }

    cart.items[itemIndex].qty = req.body.qty;
    await cart.save();
    await cart.populate('items.product');

    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error updating cart' }
    });
  }
};