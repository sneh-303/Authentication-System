// // config/db.js
// const mysql = require('mysql2/promise');
// const dotenv = require('dotenv');
// dotenv.config(); 
// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });




// config/db.js
// sequelixe
const {Sequelize} = require("sequelize");
const dotenv = require('dotenv');
dotenv.config(); 
const sequelize = new Sequelize(
 process.env.DB_DATABASE,
 process.env.DB_USER,
 process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging:false,
  }
);

module.exports = sequelize;