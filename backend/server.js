
require('dotenv').config(); // Load .env file for our mongo credentials
const express = require('express');
const connectDB = require('./config/db'); // Import DB connection

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to our database
connectDB();

// Middleware: Allows server to parse JSON bodies (for POST/PUT requests) - modification of our database, such as adding to cart or writing a review
app.use(express.json());

// Main Root Route (Test)
app.get('/', (req, res) => {
    res.send('ShopNAO API is running!');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));