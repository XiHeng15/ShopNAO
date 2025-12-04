const express = require("express");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const Order = require("../models/Order");
const User = require("../models/User");

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Stripe requires raw body for signature verification
router.post("/", bodyParser.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {// activates with successful event recieved from webhook
    const session = event.data.object;

    try {
      const { userId, productIds, orderId } = session.metadata;
      const productIdArray = productIds.split(",");

      // Retrieve line items - needed for order validation and display
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      const orderItems = lineItems.data.map((item, idx) => ({
        productId: productIdArray[idx],
        quantity: item.quantity,
        priceAtPurchase: item.amount_total / item.quantity / 100,
      }));

      // Update the existing order instead of creating a new one
      await Order.findByIdAndUpdate(orderId, {
        items: orderItems,
        amount: session.amount_total / 100,
        status: "paid",
        stripePaymentIntentId: session.payment_intent,
      });

      // Clear user's cart if successful
      await User.findByIdAndUpdate(userId, { $set: { cart: [] } });

      console.log("Order updated, cart cleared, and linked to user:", userId);
    } catch (err) {
      console.error("Webhook handler failed:", err);
      return res.status(500).send("Webhook internal error");
    }
  }

  res.status(200).json({ received: true });
});

module.exports = router;
