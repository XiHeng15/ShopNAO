
require('dotenv').config(); // Load .env file for our mongo credentials
const express = require('express');
const connectDB = require('./config/db'); // Import DB connection
const cors = require("cors");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to our database
connectDB();



// Middleware: Allows server to parse JSON bodies (for POST/PUT requests) - modification of our database, such as adding to cart or writing a review
//Allows server to talk on multiple ports
app.use(cors());

app.use("/api/webhook", require("./routes/webhook"));     // Stripe webhook (must be above middleware except cors)

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use("/api/cart", require("./routes/cart")); //added cart api route
app.use("/api/orders", require("./routes/orders"));       // Order routes
app.use("/api/payments", require("./routes/payments"));   // Payment routes (checkout session)


// test root route

app.get('/', (req, res) => {
    res.send('ShopNAO API is running!');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));