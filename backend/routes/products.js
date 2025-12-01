const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const jwt = require("jsonwebtoken");


// Multer config
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });


// GET /api/products/ - Get all products

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to verify JWT and role
function authenticateBusiness(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "business") return res.status(403).json({ message: "Forbidden" });
    req.userId = decoded.userId; // <-- this is what you should use in your route
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}


// GET all products belonging to the logged-in business
// GET /api/products/business
router.get("/business", authenticateBusiness, async (req, res) => {
  try {
    const products = await Product.find({ owner: req.userId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:id - Get one product by ID (MUST BE BELOW /api/products/business!!!!)
const mongoose = require("mongoose");

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// POST /api/products/add
router.post('/add', authenticateBusiness, upload.single('image'), async (req, res) => {
  try {
    const id = Date.now();
    const { price, message, stock } = req.body;
    const owner = req.userId; // set by authenticateBusiness
    const img = req.file ? `/uploads/${req.file.filename}` : '';

    if (price < 0) {
      return res.status(400).json({ message: "Price cannot be negative" });
    }

    if (stock < 0) {
      return res.status(400).json({message: "Stock cannot be negative"});
    }

    const product = new Product({ price, message, owner, img, id, stock });
    await product.save();

    res.status(201).json({ message: 'Product added!', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
