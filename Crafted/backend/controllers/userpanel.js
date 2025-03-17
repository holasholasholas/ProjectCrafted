// all URL here begin with /userpanel
const Vehicle = require('../models/vehicleSchema');
const User = require('../models/userSchema');
const jwt = require("jsonwebtoken");
const verifyToken = require('../middleware/verify-token');
const express = require('express');
const router = express.Router();


// route to find logged user 

router.get("/", verifyToken, async (req, res) => {
  try {
      const userId = req.user._id
      const user = await User.findById(userId).populate({
        path: 'groups.group',
        select: 'name description isPublic created' 
        
      }).populate('vehicles');
      if (!user) {
        return res.status(401).json({ err: 'Invalid credentials.' });
      }
  
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  module.exports = router;