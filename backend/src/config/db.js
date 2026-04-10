import { config } from "./config.js";
import mongoose from "mongoose";

export async function connectToDB() {
  await mongoose.connect(config.MONGO_URI);
  console.log("Connected to DB");
}
