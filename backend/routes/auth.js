const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: 'Invalid email or password' });

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // token expires in 1 hour (arbitrary choice lol)
        );

        res.json({ message: 'Login successful', token, userId: user._id, name: user.name, role: user.role });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// POST /signup
router.post('/signup', async (req, res) => {
  const { name, email, password, address, role } = req.body;

  try {

    if (!password || password.length < 8) { //added to prevent backend from accepting passwords less than 8 characters
      return res.status(400).json({
        message: "Password must be at least 8 characters long"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, address, role });
    await user.save();

    res.status(201).json({ message: 'Signup successful', userId: user._id, name: user.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
