const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  groupName: {
    type: String,
    required: true
  },
  members: [],

});

module.exports = mongoose.model('GroupOwner', groupSchema); 