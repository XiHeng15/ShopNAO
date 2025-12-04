const express = require("express");
const Stripe = require("stripe");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//JWT middleware....
const jwtAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, name: decoded.name, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// POST /api/payments/create-checkout-session

router.post("/create-checkout-session", jwtAuth, async (req, res) => {
  try {
    const { items } = req.body; // [{ productId, name, priceAtPurchase, quantity }] is being passed
    const userId = req.user.id;

    if (!items || !items.length) return res.status(400).json({ error: "Cart empty" });

    // Calculate the total order amount
    const totalAmount = items.reduce((sum, item) => sum + item.priceAtPurchase * item.quantity, 0);

    // Create order in our mongo with pending status
    const order = await Order.create({
      userId,
      items: items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
      })),
      amount: totalAmount,
      status: "pending",
    });

    // Prepare Stripe line items
    const line_items = items.map(item => ({
      price_data: {
        currency: "cad",
        product_data: { name: item.name },
        unit_amount: Math.round(item.priceAtPurchase * 100),
      },
      quantity: item.quantity,
    }));

    // Pass product IDs in metadata!!! Needed for validating checkouts!
    const productIds = items.map(item => item.productId).join(",");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      metadata: { orderId: order._id.toString(), userId, productIds },
      success_url: `${process.env.CLIENT_URL}/orders`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    // Save Stripe session ID
    order.stripeSessionId = session.id;
    await order.save();

    res.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session failed:", err);
    res.status(500).json({ error: err.message || err.toString() });
  }
});

module.exports = router;
