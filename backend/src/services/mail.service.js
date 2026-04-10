import nodemailer from "nodemailer";
import { config } from "../config/config.js";

//Setup mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: config.GOOGLE_USER,
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    refreshToken: config.GOOGLE_REFRESH_TOKEN,
  },
});

// Verify the transporter
transporter
  .verify()
  .then(() => console.log("Transporter ready to send mails"))
  .catch((err) => console.error("Transporter verification failed: ", err));

// Function to send email via transporter
export const sendEmail = async ({ to, subject, html, text }) => {
  const mailOptions = {
    from: config.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  };

  const details = await transporter.sendMail(mailOptions);

  console.log(details);
};
