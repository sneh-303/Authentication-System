const nodemailer = require("nodemailer");
// Mail function
const sendMail = (to,subject, html) => {
  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

 const mailDetails = {
    from: process.env.EMAIL,
    to, 
    subject,
    html,
  };

  mailTransporter.sendMail(mailDetails, (err, info) => {
    if (err) {
      console.log(" Email error:", err.message);
    } else {
      console.log(`Email sent: ${subject} at ${new Date().toLocaleTimeString()}`);
    }
  });
};

module.exports = sendMail;