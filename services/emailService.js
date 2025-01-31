const { transporter } = require("../config/mailConfig");
require('dotenv').config()

function mailToSpecificUser(to, subject, content) {
  const mailOptions = {
    from: process.env.MAIL_FROM || "host@gmail.com", // Replace with your email address
    to,
    subject,
    html: content,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        reject(new Error("Failed to send email: " + error.message));  // Improved error handling
      } else {
        console.log("Email sent: ", info.messageId)
        resolve("Email sent: " + info.response);  // Return success message
      }
    });
  });
}

module.exports = mailToSpecificUser;
