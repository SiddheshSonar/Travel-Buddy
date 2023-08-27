// const mongooose = require("mongoose");

import mongooose from 'mongoose';

const userSchema = new mongooose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  otp: {
    type: Number,
    required: false,
  },
  work: {
    type: String,
    required: false,
  },
  user_role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // cpassword: {
  //   type: String,
  //   required: false,
  // },
});

const User = mongooose.model("user", userSchema);

// module.exports = User;

export default User;
