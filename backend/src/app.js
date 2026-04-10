import express from "express";
import morgan from "morgan";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use(cookieParser());

// Authentication Routes
app.use("/api/auth", authRouter);

export default app;
