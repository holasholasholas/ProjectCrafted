// all URL here begin with /group
const verifyToken = require('../middleware/verify-token');
const Group = require('../models/groupOwnerSchema');
const User = require('../models/userSchema');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


// Create group to user
router.post("/", verifyToken, async (req, res) => {
    try {
        req.body.owner = req.user._id; 

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

router.post("/:group_id", verifyToken, async (req, res) => {
  try {
    const { group_id } = req.params;
    const { user_id } = req.body; 
    
   
    await Group.findByIdAndUpdate(
      group_id,
      {
        $addToSet: { members: { user: user_id, role: 'member' } }
      }
    );
    
    
    await User.findByIdAndUpdate(
      user_id,
      
      { $addToSet: { groups: { group: group_id } } } , 
    );
    
    
    res.status(200).json({ message: "user added to group" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Find group details and members
router.get("/", verifyToken, async (req, res) => {
    try {
        
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

    

    router.delete("/:group_id", verifyToken, async (req, res) => {
        try {
          const { group_id } = req.params; // Correct parameter extraction
          
          // Find and delete the group
          const deleteGroup = await Group.findByIdAndDelete(group_id);
          
          // Remove the group reference from the user's groups array
          await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { groups: { group: group_id } } } , //asked ai how to target nested data in mongo
          );
          
          res.status(200).json({ message: "Group successfully deleted", groupId: group_id });
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });

      

// update group not sure if I need it 

    //   router.put("/:group_id", verifyToken, async (req, res) => {
    //     try {
    //       const group_id = req.params.group_id; 
    //       const updatedDetails = req.body.group;

    //       // Find and delete the group
    //       const group = await Group.findById(group_id);

    //       group.set(updatedDetails)
          
    //       await group.save()
          
    //       res.status(200).json(group);
    //     } catch (err) {
    //       res.status(500).json({ error: err.message });
    //     }});



module.exports = router;