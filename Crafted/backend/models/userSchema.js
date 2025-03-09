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
 
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'  },
  
});
// // encrypt pw
// UserSchema.pre('save', async function(next) {
//   // https://mongoosejs.com/docs/api/document.html#Document.prototype.$isModified()
//   if (!this.isModified('password')) {
//     return next();
//   }
  
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // check pw
// UserSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model('User', userSchema); 