require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendEmail(userEmail, userName) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: {
      name: "Banking System Support",
      address: process.env.EMAIL_USER,
    },
    to: userEmail,
    subject: "Welcome to Our Banking System!",
    text: `Hello ${userName}, welcome to our platform!`,
    html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
      <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
        Registration Successful
      </h2>
      <p>Hello <strong>${userName}</strong>,</p>
      <p>Your account has been created successfully. You can now log in and manage your finances.</p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <strong>Login Email:</strong> ${userEmail}<br>
        <strong>Status:</strong> <span style="color: #27ae60;">Active</span>
      </div>
      <p style="font-size: 12px; color: #7f8c8d;">
        If you did not register for this account, please ignore this email.
      </p>
    </div>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome Email Sent:", info.messageId);
  } catch (error) {
    console.error("Email Error:", error);
  }
}

module.exports = sendEmail;
