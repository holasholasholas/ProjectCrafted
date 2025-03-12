const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  }, 
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    groups: [{
      group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
      role: { type: String, enum: ['member', 'owner'], default: 'member' }
    }],
 
    vehicles: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Vehicle'
    }]
  
});

module.exports = mongoose.model('User', userSchema); 