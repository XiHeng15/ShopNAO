require("dotenv").config(); //just a basic controller for stripe
const Stripe = require("stripe");
module.exports = Stripe(process.env.STRIPE_SECRET_KEY);
