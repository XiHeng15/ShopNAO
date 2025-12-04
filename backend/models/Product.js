const mongoose = require('mongoose');

// additional schema- reviewSchema, for storing multiple reviews of a product

const reviewSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true
    },

    comment: String,
    account: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// 1. Define the Schema (The Template)
const productSchema = new mongoose.Schema({
    price: {
        type: Number,//fixed, changed from Float16Array to Number
        required: true,  // This field must exist
    },
    name: { //changed back to name instead of being called message lol
        type: String,
        required: true,  // This field must exist
    },
    id: {
        type: Number, //Use number instead of Int32 Array
        required: true,
        unique: true,    // No two products can have the same ID
    },
    img: {
        type: String,
        required: true,
    },
    stock: { //Added to keep track of stock
        type: Number,
        required: true,
    },


    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // added owner reference to the schema so that businesses know their own products - made it false for testing purposes, also to allow us to sell our own branded products without making a business acount. (something amazon would prolly do).

    review: [reviewSchema], // To store array of reviews
    //score_avg and score_count will be moved to front end and calculated there.
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the date when created
    }
});



// 2. Create the Model
// This creates the 'Product' collection in MongoDB automatically
const Product = mongoose.model('Product', productSchema);

// 3. Export the Model so other files can use it
module.exports = Product;