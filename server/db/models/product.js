const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  image: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL(16, 2),
    allowNull: false
  }
})

module.exports = Product
