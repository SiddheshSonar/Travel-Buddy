// const mongooose = require("mongoose");

import mongooose from 'mongoose';

// name, email, password, gyear, branch

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
  // work: {
  //   type: String,
  //   required: false,
  // },
  // user_role: {
  //   type: String,
  //   required: true,
  // },
  graduation: {
    type: Number,
    required: false,
  },
  branch: {
    type: String,
    required: false,
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
