const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  priceCents: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0
  },
  currency: {
    type: String,
    default: 'usd',
    lowercase: true
  },
  images: [{
    type: String,
    required: [true, 'Please provide at least one image']
  }],
  category: {
    type: String,
    required: [true, 'Please provide a category']
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: 0
  },
  tags: [String]
}, {
  timestamps: true
});

productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);