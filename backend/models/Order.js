const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Link to a Payment document (will start null but be updated once payment goes through)
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      default: null,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        priceAtPurchase: { type: Number, required: true }, // store snapshot price
      },
    ],

    // Total cost at time of purchase (never recalc later)
    amount: {
      type: Number,
      required: true,
    },

    // Order state lifecycle
    status: {
      type: String,
      enum: [
        "pending",   // created but not paid
        "paid",      // PaymentIntent succeeded
        "shipped",
        "delivered",
        "cancelled",
        "failed",    // PaymentIntent failed
        "refunded",
      ],
      default: "pending",
    },

    // STRIPE FIELDS:
    stripePaymentIntentId: { type: String },  // THE MOST IMPORTANT FIELD!!!!!!!!!
    stripeRefundId: { type: String, default: null }, //Optional in case of refund

    // Refund audit details...
    refundedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
