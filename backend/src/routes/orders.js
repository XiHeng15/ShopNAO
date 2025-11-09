const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const {
  createOrder,
  getOrders,
  getOrder
} = require('../controllers/orderController');

const router = express.Router();

// All order routes require authentication
router.use(auth);

router.post('/', [
  body('shippingAddress').isObject().withMessage('Shipping address is required'),
  body('shippingAddress.line1').notEmpty(),
  body('shippingAddress.city').notEmpty(),
  body('shippingAddress.state').notEmpty(),
  body('shippingAddress.zip').notEmpty(),
  body('shippingAddress.country').notEmpty()
], createOrder);

router.get('/', getOrders);
router.get('/:id', getOrder);

module.exports = router;