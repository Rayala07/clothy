import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email should be unique"],
  },
  contact: {
    type: String,
    required: [true, "contact is required"],
  },
  fullname: {
    type: String,
    required: [true, "fullname is required"],
  },
  role: {
    type: String,
    enum: ["buyer", "seller"],
    default: "buyer",
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.comparePassword(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
