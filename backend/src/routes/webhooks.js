const express = require('express');
const stripe = require('../config/stripe');
const Order = require('../models/Order');

const router = express.Router();

router.post('/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      
      // Update order status
      await Order.findOneAndUpdate(
        { 'payment.paymentIntentId': paymentIntent.id },
        { 
          $set: {
            'payment.status': 'paid',
            status: 'confirmed'
          }
        }
      );
    }

    res.json({ received: true });
  } catch (err) {
    res.status(400).json({ success: false, error: { message: err.message } });
  }
});

module.exports = router;