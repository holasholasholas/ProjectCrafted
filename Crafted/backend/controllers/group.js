// all URL here begin with /group
const verifyToken = require('../middleware/verify-token');
const Group = require('../models/groupOwnerSchema');
const User = require('../models/userSchema');
const express = require('express');
const router = express.Router();

// Create group
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

// Add user to group
router.post("/:group_id", verifyToken, async (req, res) => {
  try {
    const { group_id } = req.params;
    const { user_id } = req.body;

    // Find the group
    const group = await Group.findById(group_id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Find the user to add
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if user is already in the group
    const isUserInGroup = group.members.some(member => 
      member.user.toString() === user_id.toString()
    );
    
    if (isUserInGroup) {
      return res.status(400).json({ error: "User is already in this group" });
    }

    // Add user to group
    await Group.findByIdAndUpdate(
      group_id,
      {
        $addToSet: { members: { user: user_id, role: 'member' } }
      }
    );

    // Add group to user's groups
    await User.findByIdAndUpdate(
      user_id,
      { $addToSet: { groups: { group: group_id, role: 'member' } } }
    );

    res.status(200).json({ message: "User added to group" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all groups for logged in user
router.get("/", verifyToken, async (req, res) => {
    try {
        // Find the user and populate their groups
        const user = await User.findById(req.user._id)
          .populate({
            path: "groups.group",
            model: "Group",
            populate: {
              path: "members.user",
              model: "User",
              select: "username name email"
            }
          });
        
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        
        // Map groups to a more friendly format
        const userGroups = user.groups.map(groupObj => {
          const group = groupObj.group;
          return {
            _id: group._id,
            name: group.name,
            description: group.description,
            owner: group.owner,
            members: group.members,
            userRole: groupObj.role
          };
        });
        
        res.status(200).json(userGroups);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

// Get specific group details
router.get("/:group_id", verifyToken, async (req, res) => {
  try {
    const { group_id } = req.params;
    
    const group = await Group.findById(group_id)
      .populate({
        path: "members.user",
        select: "username name email"
      })
      .populate({
        path: "owner",
        select: "username name email"
      });
    
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete group
router.delete("/:group_id", verifyToken, async (req, res) => {
  try {
    const { group_id } = req.params;
    
    // Find the group
    const group = await Group.findById(group_id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    
    // Check if the requester is the owner
    if (group.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Only the group owner can delete the group" });
    }
    
    // Delete the group
    await Group.findByIdAndDelete(group_id);
    
    // Remove the group from all users' groups array
    await User.updateMany(
      { "groups.group": group_id },
      { $pull: { groups: { group: group_id } } }
    );
    
    res.status(200).json({ message: "Group successfully deleted", groupId: group_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update group details
router.put("/:group_id", verifyToken, async (req, res) => {
  try {
    const { group_id } = req.params;
    const updatedDetails = req.body;
    
    // Find the group
    const group = await Group.findById(group_id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    
    // Check if the requester is the owner
    if (group.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Only the group owner can update the group" });
    }
    
    // Update allowed fields only
    if (updatedDetails.name) group.name = updatedDetails.name;
    if (updatedDetails.description) group.description = updatedDetails.description;
    
    await group.save();
    
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:group_id/members/:user_id", verifyToken, async (req, res) => {
  try {
    const { group_id, user_id } = req.params;
    
    // Find the group
    const group = await Group.findById(group_id);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    
    // Check if the requester is the owner or the user being removed
    const isOwner = group.owner.toString() === req.user._id.toString();
    const isSelfRemoval = user_id === req.user._id.toString();
    
    if (!isOwner && !isSelfRemoval) {
      return res.status(403).json({ error: "Only the group owner or the user themselves can remove a user from the group" });
    }
    
    // Remove user from group
    await Group.findByIdAndUpdate(
      group_id,
      { $pull: { members: { user: user_id } } }
    );
    
    // Remove group from user's groups
    await User.findByIdAndUpdate(
      user_id,
      { $pull: { groups: { group: group_id } } }
    );
    
    res.status(200).json({ message: "User removed from group" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;