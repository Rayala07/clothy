import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const sendTokenResponse = (user, res) => {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    status: true,
    user: {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      contact: user.contact,
    },
  });
};

export const registerUserController = async (req, res) => {
  const { fullname, email, contact, password } = req.body;

  try {
    const isUserExists = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (isUserExists) {
      return res.status(400).json({
        status: false,
        message: "User with these credentials already exists",
      });
    }

    const user = await userModel.create({
      fullname,
      email,
      contact,
      password,
    });

    sendTokenResponse(user, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};
