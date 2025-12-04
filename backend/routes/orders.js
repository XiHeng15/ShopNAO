const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");

const router = express.Router();
const jwt = require("jsonwebtoken");

// JWT middleware
const jwtAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, name: decoded.name, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Get orders for logged-in user
router.get("/my-orders", jwtAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate({
        path: "items.productId",
        select: "name price owner", // pick the fields you want
        populate: { path: "owner", select: "name" } // optionally populate the business owner
      })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("ERROR IN /api/orders/my-orders:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get orders for products owned by logged-in seller
router.get("/product-orders", jwtAuth, async (req, res) => {
  try {
    const sellerId = req.user.id;

    // Get all products for this seller
    const products = await Product.find({ owner: sellerId });
    const productIds = products.map((p) => p._id.toString());

    // Get all orders that include at least one of the seller's products
    const orders = await Order.find({ "items.productId": { $in: productIds } })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    // Filter items per order to only include this seller's products
    const filteredOrders = orders.map((order) => {
      const itemsForSeller = order.items
        .filter((item) => productIds.includes(item.productId?._id.toString()))
        .map((item) => ({
          productName: item.productId.name,
          productPrice: item.priceAtPurchase,
          quantity: item.quantity,
        }));

      return {
        _id: order._id,
        userId: order.userId,
        status: order.status,
        createdAt: order.createdAt,
        items: itemsForSeller,
        totalAmount: itemsForSeller.reduce(
          (sum, item) => sum + item.productPrice * item.quantity,
          0
        ),
      };
    });

    res.json(filteredOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Update order status (Business only) (not implemented and probably broken now lol)
router.patch("/update-status/:orderId", jwtAuth, async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  // Only allow valid status updates
  const validStatuses = ["shipped", "delivered", "cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const order = await Order.findById(orderId).populate("items.productId");
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Check that at least one product in the order belongs to this business
    const sellerId = req.user.id;
    const hasSellerProduct = order.items.some(
      (item) => item.productId?.owner?.toString() === sellerId
    );

    if (!hasSellerProduct) {
      return res.status(403).json({ message: "You cannot update this order" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order updated", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
