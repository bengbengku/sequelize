const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
})

module.exports = conn
