const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

// Middleware: Authenticate user via JWT
function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

// GET /api/cart - fetch user's cart with product info
router.get("/", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("cart.product");
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/cart/add - add a product to cart
router.post("/add", authenticateUser, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const user = await User.findById(req.userId);
    const existing = user.cart.find(item => item.product.equals(productId));

    if (existing) {
      existing.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    const populatedCart = await User.findById(req.userId).populate("cart.product");
    res.json({ message: "Added to cart!", cart: populatedCart.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/cart/remove - remove product from cart
router.post("/remove", authenticateUser, async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.userId);
    user.cart = user.cart.filter(item => !item.product.equals(productId));
    await user.save();

    const populatedCart = await User.findById(req.userId).populate("cart.product");
    res.json({ message: "Removed from cart!", cart: populatedCart.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/cart/update - update quantity of a product
router.post("/update", authenticateUser, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const user = await User.findById(req.userId);
    const item = user.cart.find(item => item.product.equals(productId));
    if (item) item.quantity = quantity;

    await user.save();
    const populatedCart = await User.findById(req.userId).populate("cart.product");
    res.json({ message: "Cart updated!", cart: populatedCart.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
