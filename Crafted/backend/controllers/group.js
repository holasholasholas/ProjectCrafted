// all URL here begin with /group
const verifyToken = require('../middleware/verify-token');
const Group = require('../models/groupOwnerSchema');
const User = require('../models/userSchema');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');



router.post("/", verifyToken, async (req, res) => {
    try {
        req.body.owner = req.user._id; // assign group to user

        const newGroup = await Group.create(req.body);
    
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $addToSet: {
                    groups: {
                        group: newGroup._id, // add group details to user{groups}
                        role: 'owner' // Set the role to 'owner'
                    }
                }
            }
        );

        newGroup._doc.owner = req.user;
        res.status(201).json(newGroup);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/", verifyToken, async (req, res) => {
    try {
        // Find group details and members
        const user = await User.findById(req.user._id).populate({
          path: "groups",
          match: { createdBy: req.user._id },
          populate: { path: "members" }
        });
        
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        
        res.status(200).json(user.groups);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });



module.exports = router;