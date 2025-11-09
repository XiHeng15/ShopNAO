const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem
} = require('../controllers/cartController');

const router = express.Router();

// All cart routes require authentication
router.use(auth);

router.get('/', getCart);

router.post('/', [
  body('productId').isMongoId().withMessage('Valid product ID required'),
  body('qty').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], addToCart);

router.put('/:itemId', [
  body('qty').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], updateCartItem);

router.delete('/:itemId', removeFromCart);

module.exports = router;