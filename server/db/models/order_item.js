const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cart_item', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
})

module.exports = CartItem
