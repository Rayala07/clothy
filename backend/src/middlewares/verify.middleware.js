import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import redisClient from "../config/redis.js";
import userModel from "../models/user.model.js";

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({
        status: false,
        message: "Token not found",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Check if token is blacklisted
    const isBlacklisted = await redisClient.get(`bl_${token}`);

    if (isBlacklisted) {
      return res.status(401).json({
        status: false,
        message: "Token is invalid",
      });
    }

    req.user = decoded;
    req.token = token;

    next();
  } catch (err) {
    console.error("An error occured: ", err);
  }
};

export const authenticateSeller = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await userModel.findOne(id);

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized Access",
      });
    }

    if (user.role !== "seller") {
      return res.status(403).json({
        status: false,
        message: "Forbidden Access",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("An error occured: ", err);
  }
};
