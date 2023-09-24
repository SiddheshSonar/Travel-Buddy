import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
  clg_uid: {
    type: Number,
  }, 
  otp: {
    type: Number,
    required: false,
  },
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
  location: {
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    }
  },
  friends: [{
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    status: {
      type: String,
      enum: ['SENT','PENDING', 'ACCEPTED', 'REJECTED', 'BLOCKED'],
      default: 'PENDING',
    },
  }],
});

const User = mongoose.model("user", userSchema);

export default User;
