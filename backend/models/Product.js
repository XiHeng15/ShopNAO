const mongoose = require('mongoose');

// 1. Define the Schema (The Template)
const productSchema = new mongoose.Schema({
    price: {
        type: Float16Array,
        required: true,  // This field must exist
    },
    message: { //AKA name but named message to keep consistency across project
        type: String,
        required: true,  // This field must exist
    },
    id: {
        type: Int32Array,
        required: true,
        unique: true,    // No two products can have the same ID
    },
    img: {
        type: String,
        required: true,
    },

    review: {
        score: Int8Array,
        score_avg: Int8Array,
        score_count: Int8Array,
    },
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