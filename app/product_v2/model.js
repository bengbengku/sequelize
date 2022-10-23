const sequelize = require('../../config/sequalize')
const { Sequelize, DataTypes } = require('sequelize')

const Product = sequelize.define(
  'Product',
  {
    // Model attributes are defined here
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT,
    },
  },
  {
    // Other model options go here
  }
)

module.exports = Product
