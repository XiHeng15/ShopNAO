const mongoose = require('mongoose');

// 1. Define the Schema (The Template)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // This field must exist
    trim: true       // Removes whitespace from ends
  },
  email: {
    type: String,
    required: true,
    unique: true,    // No two users can have the same email
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },

  role: { //Added role so that we can have business and customer users.
    type: String,
    enum: ['customer', 'business'],
    default: 'customer'
  },


  // Embedding: Address is stored inside the User document
  address: {
    street: String,
    city: String,
    zipCode: String,
    country: String
  },
  // Referencing: We track specific Order IDs belonging to this user
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order' // Links to the 'Order' collection
  }],

  cart: [ // Added cart to user model for storing products added to cart
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, default: 1 }
  }
  ],


  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the date when created
  }
});

// 2. Create the Model
// This creates the 'users' collection in MongoDB automatically
const User = mongoose.model('User', userSchema);

// 3. Export the Model so other files can use it
module.exports = User;