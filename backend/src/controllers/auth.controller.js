import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { sendEmail } from "../services/mail.service.js";

// Create a Token for the user and send user details as response.
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

// OTP generator function
const generateOtp = () => {
  return String(Math.floor(100000 + Math.random() * 900000));
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

    // Generate OTP and set OTP expiry time
    const otp = generateOtp();
    const expiry = Date.now() + 5 * 60 * 1000;
    const sentAt = Date.now();

    user.otp = otp;
    user.otpExpiry = expiry;
    user.otpSentAt = sentAt;

    await user.save();

    // Send OTP to user's email
    const emailBody = `
      <p>We are glad you joined Clothy 😄</p>
      <p>To complete your verification and registration successfully.</p>
      <br>
      <p>Enter OTP: ${otp}</p>
      <p>This OTP is valid for 5 minutes only</p>
    `;

    await sendEmail({
      to: email,
      subject: "Welcome to Clothy, Please Verify account !",
      html: emailBody,
    });

    res.status(201).json({
      status: true,
      message: "OTP sent to user email",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

export const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      status: false,
      message: "Sorry, user not found",
    });
  }

  if (user.verified) {
    return res.status(400).json({
      status: false,
      message: "User already verified",
    });
  }

  if (otp !== user.otp) {
    return res.status(400).json({
      status: false,
      message: "Invalid OTP",
    });
  }

  if (user.otpExpiry < Date.now()) {
    return res.status(400).json({
      status: false,
      message: "OTP expired, try again",
    });
  }

  user.verified = true;

  user.otp = undefined;
  user.otpExpiry = undefined;
  user.otpSentAt = undefined;

  await user.save();

  return res.status(201).json({
    status: true,
    message: "User verified successfully",
  });
};

export const resendOtpController = async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      status: false,
      message: "Sorry, user not found",
    });
  }

  if (user.verified) {
    return res.status(409).json({
      status: false,
      message: "User is already verified",
    });
  }

  const cooldown = 5 * 60 * 1000;

  if (Date.now() - user.otpSentAt < cooldown) {
    return res.status(400).json({
      status: false,
      message: "Please wait before requesting another OTP",
    });
  }

  const otp = generateOtp();
  const expiry = Date.now() + 5 * 60 * 1000;
  const otpSentAt = Date.now();

  user.otp = otp;
  user.otpExpiry = expiry;
  user.otpSentAt = otpSentAt;

  await user.save();

  // Re-Send OTP to user's email
  const emailBody = `
      <p>We are glad you joined Clothy 😄</p>
      <p>OTP: ${otp}</p>
      <p>Use it to verify you account at Clothy</p>
      <br>
      <p>OTP valid for the next 5 minutes.</p>
    `;

  await sendEmail({
    to: email,
    subject: "Clothy- Resent OTP",
    html: emailBody,
  });

  return res.status(200).json({
    status: true,
    message: "OTP resent successfully",
  });
};
