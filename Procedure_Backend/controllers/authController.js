const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require('../controllers/emailController');
const pool =require('../config/db')
const XLSX = require("xlsx");
const fs = require("fs");
const upload = require('../middleware/ExcelUpload')
// Register route
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!req.file) {
    return res.status(400).json({ msg: "Profile picture is required" });
  }

  const profilePicture = req.file.path;

  try {
    // Hash password BEFORE calling the stored procedure
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Call the stored procedure using mysql2/promise connection
    const [result] = await pool.query(
      "CALL RegisterUser(?, ?, ?, ?)",
      [name, email, hashedPassword, profilePicture]
    );

        // 1. Generate OTP and expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_expiry = new Date(Date.now() + 1 * 60 * 1000); // 1 minute expiry

    const insertedUser = result?.[0]?.[0];
if (!insertedUser) {
  return res.status(500).json({ msg: "Registration failed. No user returned." });
}
const user_id = insertedUser.id;

    // 2. Store OTP in DB
   await pool.query("CALL InsertOtp(?, ?, ?, ?)", [
  email, user_id, otp, otp_expiry
]);

    // 3. Send OTP via email
    sendMail(email,
      "Verify Your Email",
      `<p>Hello ${name},</p>
       <p>Your OTP for email verification is: <strong>${otp}</strong></p>
       <p>This OTP is valid for 1 minute.</p>`
    );

    res.status(201).json({ msg: "User registered successfully. OTP sent to email.", email });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: err.message || "Server error" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    await pool.query("CALL VerifyOtpAndUpdateUser(?, ?)", [email, otp]);
    res.json({ msg: "OTP verified successfully" });
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(400).json({ msg: err.sqlMessage || "OTP verification failed" });
  }
};



// Login route
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {

    // / 1. Get user from stored procedure
        // Call stored procedure to get user by email
    const [users] = await pool.query('CALL LoginUser(?)', [email]);

    const user = users[0][0];   
    // 2. Check if user exists

    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
      // 3. Check if user is verified
    if (!user.is_verified) {
      return res.status(403).json({
        msg: "Email not verified. Please verify before logging in.",
        showVerifyButton: true,
        email: user.email,
        user_id: user.id,
        name: user.name, // if you want to use it in resend-otp
      });
    }
 // 4. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
 // 5. Issue token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
    const decoded = jwt.decode(token);
    const expiryTimeStamp = decoded?.exp;

    res.json({ token, expiryTimeStamp });
    sendMail(user.email,
      "Login Successfully",
      `
      <p>Hello ${user.name},</p>
       <strong> <p>Your login is successful </strong></p>`
       
    );
  } catch (err) {
    console.error("Login error:", err);
     if (err.code === 'ER_SIGNAL_EXCEPTION' && err.sqlMessage === 'User Not Found') {
      return res.status(400).json({ msg: err.sqlMessage });
    }
    res.status(500).json({ msg: "Server error" });
  } 
};




exports.resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // Get user by email
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = users[0];

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.is_verified) {
      return res.status(400).json({ msg: "Email is already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_expiry = new Date(Date.now() + 1 * 60 * 1000); // 1 minute

    await pool.query("CALL InsertOtp(?, ?, ?, ?)", [email, user.id, otp, otp_expiry]);

    sendMail(user.email,

      "Resend OTP - Email Verification",
      `<p>Hello ${user.name},</p>
       <p>Your new OTP is: <strong>${otp}</strong></p>
       <p>This OTP is valid for 1 minute.</p>`
    );

    res.status(200).json({ msg: "OTP resent to your email." });
  } catch (err) {
    console.error("Resend OTP error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


// Profile route
exports.profile = async (req, res) => {
const userId = req.user?.userId;
console.log("id being passed to procedure:", userId);
  try {
    const [results] = await pool.query('CALL GetProfileUser(?)',[userId]);

    const user = results?.[0]?.[0];
    if (!user) return res.status(404).json({ msg: "User not found" });

    delete user.password; // remove password before sending response
    res.json(user);
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all users
exports.userList = async (req, res) => {
  try {
    const [results] = await pool.query('CALL GetALLUser()');

    const user = results?.[0];
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// exports.importUsers = async (req, res) => {
//   if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

//   try {
//     const workbook = XLSX.readFile(req.file.path);
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const users = XLSX.utils.sheet_to_json(sheet);

//     const importResults = [];

//     for (let i = 0; i < users.length; i++) {
//       const { Name, Email, Password, ProfilePicture } = users[i];

//       const missingFields = [];
//       if (!Name) missingFields.push("name");
//       if (!Email) missingFields.push("email");
//       if (!Password) missingFields.push("password");
//       if (!ProfilePicture) missingFields.push("profilePicture");

//       if (missingFields.length > 0) {
//         importResults.push({
//           Email: Email || "N/A",
//           status: `Missing ${missingFields.join(", ")}`
//         });
//         continue;
//       }

//       try {
//         const [existing] = await pool.query(
//           "SELECT * FROM users WHERE email = ?",
//           [Email]
//         );

//         if (existing.length > 0) {
//           importResults.push({ Email, status: "Duplicate email" });
//           continue;
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(Password, salt);

//         const [result] = await pool.query("CALL RegisterUser(?, ?, ?, ?)", [
//           Name,
//           Email,
//           hashedPassword,
//           ProfilePicture,
//         ]);

//         const insertedUser = result?.[0]?.[0];
//         if (!insertedUser) {
//           importResults.push({ Email, status: "Failed to register" });
//         } else {
//           importResults.push({ Email, status: "Imported" });
//         }
//       } catch (error) {
//         importResults.push({
//           Email,
//           status: error.sqlMessage || error.message
//         });
//       }
//     }

//     fs.unlinkSync(req.file.path);

//     res.status(200).json({ msg: "Import completed", importResults });
//   } catch (err) {
//     console.error("Import error:", err);
//     res.status(500).json({ msg: "Failed to import users" });
//   }
// };


// BELOW IS OPTIMIZE WAY 
exports.importUsers = async (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const users = XLSX.utils.sheet_to_json(sheet);

    const importResults = [];
    const usersToInsert = [];

    for (let i = 0; i < users.length; i++) {
      const { Name, Email, Password, ProfilePicture } = users[i];

      const missingFields = [];
      if (!Name) missingFields.push("name");
      if (!Email) missingFields.push("email");
      if (!Password) missingFields.push("password");
      if (!ProfilePicture) missingFields.push("profilePicture");

      if (missingFields.length > 0) {
        importResults.push({
          Email: Email || "N/A",
          status: `Missing ${missingFields.join(", ")}`
        });
        continue;
      }

      const [existing] = await pool.query("SELECT 1 FROM users WHERE email = ?", [Email]);
      if (existing.length > 0) {
        importResults.push({ Email, status: "Duplicate email" });
        continue;
      }

      const hashedPassword = await bcrypt.hash(Password, 10);

      usersToInsert.push([Name, Email, hashedPassword, ProfilePicture]);
      importResults.push({ Email, status: "Queued for import" });
    }

    // Batch insert using a stored procedure (modify accordingly if needed)
    for (const user of usersToInsert) {
      try {
        await pool.query("CALL RegisterUser(?, ?, ?, ?)", user);
      } catch (error) {
        importResults.push({
          Email: user[1],
          status: error.sqlMessage || error.message
        });
      }
    }

    fs.unlinkSync(req.file.path);

    res.status(200).json({ msg: "Import completed", importResults });
  } catch (err) {
    console.error("Import error:", err);
    res.status(500).json({ msg: "Failed to import users" });
  }
};



// // PUT user
// exports.putUser = async (req, res) => {
//   const { serialNumber } = req.params;
//   const { name, email, password } = req.body;
//   const profilePicture = req.file?.path;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const [result] = await pool.query('CALL put_user(?, ?, ?, ?, ?)', [
//       serialNumber,
//       name,
//       email,
//       hashedPassword,
//       profilePicture
//     ]);

//     const affectedRows = result?.[0]?.[0]?.affectedRows || 0;

//     res.status(200).json({ msg: "User updated (PUT)", affectedRows });
//   } catch (err) {
//     console.error("PUT error:", err);
//     res.status(400).json({ msg: err.sqlMessage || "PUT failed" });
//   }
// };


// // PATCH user
// exports.patchUser = async (req, res) => {
//   const { serialNumber } = req.params;
//   const { name = '', email = '', password = '' } = req.body;
//   const profilePicture = req.file?.path || '';

//   try {
//     const hashedPassword = password ? await bcrypt.hash(password, 10) : '';

//     const [result] = await pool.query('CALL patch_user(?, ?, ?, ?, ?)', [
//       serialNumber,
//       name,
//       email,
//       hashedPassword,
//       profilePicture
//     ]);

//     const affectedRows = result?.[0]?.[0]?.affectedRows || 0;

//     res.status(200).json({ msg: "User updated (PATCH)", affectedRows });
//   } catch (err) {
//     console.error("PATCH error:", err);
//     res.status(400).json({ msg: err.sqlMessage || "PATCH failed" });
//   }
// };


// // DELETE user
// exports.deleteUser = async (req, res) => {
//   const { serialNumber } = req.params;

//   try {
//     const [result] = await pool.query('CALL delete_user(?)', [serialNumber]);
//     const affectedRows = result?.[0]?.[0]?.affectedRows || 0;

//     res.status(200).json({ msg: "User deleted", affectedRows });
//   } catch (err) {
//     console.error("DELETE error:", err);
//     res.status(400).json({ msg: err.sqlMessage || "Delete failed" });
//   }
// };

