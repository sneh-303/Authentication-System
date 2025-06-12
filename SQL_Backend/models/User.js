// models/User.js
// const pool = require('../config/db');

// const User = {
//   async findByEmail(email) {
//     const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     return rows[0];
//   },

//   async findById(id) {
//     const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
//     return rows[0];
//   },

//   async findLastUser() {
//     const [rows] = await pool.query('SELECT * FROM users ORDER BY serialNumber DESC LIMIT 1');
//     return rows[0];
//   },

//   async createUser({ name, email, password, serialNumber, ProfilePicture }) {
//     const [result] = await pool.query(
//       'INSERT INTO users (name, email, password, serialNumber, ProfilePicture) VALUES (?, ?, ?, ?, ?)',
//       [name, email, password, serialNumber, ProfilePicture]
//     );
//     return result.insertId;
//   },

//   async getAll() {
//     const [rows] = await pool.query('SELECT * FROM users');
//     return rows;
//   },

//   async replaceUser(serialNumber, updatedData) {
//     const { name, email, password, ProfilePicture } = updatedData;
//     const [result] = await pool.query(
//       'UPDATE users SET name = ?, email = ?, password = ?, ProfilePicture = ? WHERE serialNumber = ?',
//       [name, email, password, ProfilePicture, serialNumber]
//     );
//     return result.affectedRows;
//   },

//   async updateUser(serialNumber, updateData) {
//     const fields = Object.keys(updateData).map(field => `${field} = ?`).join(', ');
//     const values = Object.values(updateData);
//     values.push(serialNumber);
//     const [result] = await pool.query(`UPDATE users SET ${fields} WHERE serialNumber = ?`, values);
//     return result.affectedRows;
//   },

//   async deleteUser(serialNumber) {
//     const [result] = await pool.query('DELETE FROM users WHERE serialNumber = ?', [serialNumber]);
//     return result.affectedRows;
//   },
// };





const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serialNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  ProfilePicture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
