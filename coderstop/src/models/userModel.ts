import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a user name"],
      unique: [true, "Username must be unique"],
    },
    email: {
      type: String,
      required: [true, "Please provide a user name"],
      unique: [true, "Username must be unique"],
    },
    password: {
      type: String,
      required: [true, "Please provide a user name"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);
 const User=mongoose.models.users|| mongoose.model('users',userSchema);
 export default User;
