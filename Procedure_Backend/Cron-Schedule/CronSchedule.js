const cron = require("node-cron");
const nodemailer = require("nodemailer");
const pool = require("../config/db");

const UpdateEveryTime = () => {
  cron.schedule("5 * * * *", async () => {
    try {
      // Check for new users
      const [result] = await pool.query("CALL get_new_registered_users()");
      const newUsers = result[0];

      // Always update total count
      const [countResult] = await pool.query("CALL count_user_procedure()");
      const totalUserCount = countResult[0][0].total_users;

      // Prepare HTML email
      let html = `<h3>Total Users Count</h3>
        <p><strong>Total users:</strong> ${totalUserCount}</p>`;

      if (newUsers.length > 0) {
        // Add new user table if there are new users
        const tableRows = newUsers.map(user =>
          `<tr><td>${user.name}</td><td>${user.email}</td></tr>`
        ).join("");

        html += `
          <h3>New Users Registered (last 1 min)</h3>
          <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
            <tr><th>Name</th><th>Email</th></tr>
            ${tableRows}
          </table>`;
        console.log(" New users found and count updated.");
      } else {
        console.log(" No new users, only count sent.");
      }

      html += `<p><strong>Time:</strong> ${new Date().toLocaleString()}</p>`;

      // Send combined email
      sendMail(" User Update Summary", html);

    } catch (err) {
      console.error(" Error in  Cron Job:", err.message);
    }
  });
};



const AllData = () => {
     cron.schedule("0 23 * * *", async () => {
         try {

            //send all user data at 11pm
    const [results] = await pool.query('CALL GetALLUser()');
    const user = results?.[0];
 

      // Prepare HTML email
        const [countResult] = await pool.query("CALL count_user_procedure()");
      const totalUserCount = countResult[0][0].total_users;

      // Prepare HTML email
      let html = `<h3>Total Users Count</h3>
        <p><strong>Total users:</strong> ${totalUserCount}</p>`;
    
       
        const tableRows = user.map(user1 =>
          `<tr><td>${user1.serialNumber}</td><td>${user1.name}</td><td>${user1.email}</td></tr>`
        ).join("");

        html += `
          <h3> All Users in Data (last 1 min)</h3>
          <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
            <tr><th>SR-NO</th><th>Name</th><th>Email</th></tr>
            ${tableRows}
          </table>`;
        console.log(" New users found and count updated.");
     

      html += `<p><strong>Time:</strong> ${new Date().toLocaleString()}</p>`;

      // Send combined email
      sendMail(" User Update Summary", html);

    } catch (err) {
      console.error(" Error in  Cron Job:", err.message);
    }
     })
}
// Mail function
const sendMail = (subject, html) => {
  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailDetails = {
    from: process.env.EMAIL,
    to:  process.env.EMAIL_TO_SEND,
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

module.exports = {
  UpdateEveryTime,AllData
};
