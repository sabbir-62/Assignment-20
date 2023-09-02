const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true, 
    unique: [true, "Please provide a unique email"],
    validate: [validator.isEmail, "provide a valid Email"]
},
password: {
    type: String,
    required: [true, "Password is required"],
    min: [6, "User password min length 6 characters"],
    set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
},
address: String,
phoneNumber: String,
});

userSchema.pre('remove', async function (next) {

    await CartItem.deleteMany({ user: this._id });

    await Order.deleteMany({ user: this._id });
  
    next();
  });
  

const User = mongoose.model('User', userSchema);

module.exports = User;
