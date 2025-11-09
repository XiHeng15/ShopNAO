const { validationResult } = require('express-validator');
const stripe = require('../config/stripe');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: { message: 'Validation error', details: errors.array() }
    });
  }

  try {
    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id })
                         .populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        error: { message: 'Cart is empty' }
      });
    }

    // Verify stock and calculate total
    let totalCents = 0;
    for (const item of cart.items) {
      const product = item.product;
      if (product.stock < item.qty) {
        return res.status(400).json({
          success: false,
          error: { message: `Not enough stock for ${product.name}` }
        });
      }
      totalCents += product.priceCents * item.qty;
    }

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'usd',
      metadata: { userId: req.user._id.toString() }
    });

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        priceCents: item.product.priceCents,
        qty: item.qty
      })),
      totalCents,
      shippingAddress: req.body.shippingAddress,
      payment: {
        paymentIntentId: paymentIntent.id
      }
    });

    // Update stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.qty }
      });
    }

    // Clear cart
    await Cart.findByIdAndDelete(cart._id);

    res.status(201).json({
      success: true,
      data: {
        order,
        clientSecret: paymentIntent.client_secret
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error creating order' }
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
                            .sort({ createdAt: -1 });
    
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching orders' }
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: { message: 'Order not found' }
      });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching order' }
    });
  }
};