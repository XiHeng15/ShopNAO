const express = require('express');
const { body, query } = require('express-validator');
const auth = require('../middleware/auth');
const adminGuard = require('../middleware/adminGuard');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

// Public routes
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
], getProducts);

router.get('/:id', getProduct);

// Admin routes
router.use(auth, adminGuard);

router.post('/', [
  body('name').trim().notEmpty(),
  body('description').trim().notEmpty(),
  body('priceCents').isInt({ min: 0 }),
  body('stock').isInt({ min: 0 }),
  body('category').trim().notEmpty(),
  body('images').isArray().notEmpty()
], createProduct);

router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;