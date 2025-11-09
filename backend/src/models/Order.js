const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: String,
  priceCents: Number,
  qty: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalCents: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'usd'
  },
  shippingAddress: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  payment: {
    provider: {
      type: String,
      enum: ['stripe'],
      default: 'stripe'
    },
    paymentIntentId: String,
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);