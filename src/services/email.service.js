require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"Sender Name" <sender@gmail.com>',
    to: "receiver@gmail.com",
    subject: "Hello from Nodemailer",
    text: "This is a plain text message.",
    html: "<h1>This is an HTML message.</h1>",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Success:", info.messageId);
  } catch (error) {
    console.error("Error:", error);
  }
}

sendEmail();

module.exports = sendEmail;
