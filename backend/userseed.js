require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});

    // Create a sample user
    const hashedPassword = await bcrypt.hash('password123', 10);

    const user = new User({
      name: 'Robin',
      email: 'robin@example.com',
      password: hashedPassword,
      address: {
        street: '123 Main St',
        city: 'Toronto',
        zipCode: 'M1A1A1',
        country: 'Canada'
      }
    });

    await user.save();
    console.log('User seeded successfully');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
