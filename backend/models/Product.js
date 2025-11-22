const mongoose = require('mongoose');

// 1. Define the Schema (The Template)
const productSchema = new mongoose.Schema({
    price: {
        type: Number,//fixed, changed from Float16Array to Number
        required: true,  // This field must exist
    },
    message: { //AKA name but named message to keep consistency across project
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

    review: [reviewSchema], // To store array of reviews
    //score_avg and score_count will be moved to front end and calculated there.
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the date when created
    }
});

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

// 2. Create the Model
// This creates the 'Product' collection in MongoDB automatically
const Product = mongoose.model('Product', productSchema);

// 3. Export the Model so other files can use it
module.exports = Product;