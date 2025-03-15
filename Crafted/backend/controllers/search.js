// all URL here begin with /search
const Vehicle = require('../models/vehicleSchema');
const User = require('../models/userSchema');
const jwt = require("jsonwebtoken");
const verifyToken = require('../middleware/verify-token');
const express = require('express');
const router = express.Router();

// Route to find all users in the database
router.get("/users", verifyToken, async (req, res) => {
    try {
        // Find all users
        const allUsers = await User.find({}).populate('vehicles');
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Route to find all cars in the database

router.get("/cars", verifyToken, async (req, res) => {
  
    try {
      // Find the user and populate their vehicles
      const allCars = await Vehicle.find({}).populate('owner');
      
      res.status(200).json(allCars);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// route to find logged user 

router.get("/", verifyToken, async (req, res) => {
  try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(401).json({ err: 'Invalid credentials.' });
      }
  
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(401).json({ err: 'Invalid credentials.' });
      }
  
      const payload = { username: user.username, _id: user._id };
  
      const token = jwt.sign({ payload }, process.env.JWT_SECRET);
  
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  module.exports = router;