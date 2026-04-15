import express from "express";
import morgan from "morgan";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import "dotenv/config";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./config/config.js";

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(passport.initialize());

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: config.GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

// Authentication Routes
app.use("/api/auth", authRouter);

export default app;
