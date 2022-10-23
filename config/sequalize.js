const dotenv = require('dotenv')
dotenv.config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  host: 'localhost',
  username: 'root',
  password: process.env.PASSWORD,
  dialect: 'mysql',
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error)
  })

module.exports = sequelize
