const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(['pending', 'fulfilled']),
    allowNull: false,
    defaultValue: 'pending'
  }
})

Order.prototype.setQuantity = function(product, quantity) {
  // const OrderItem = db.model('order_item')
  if (quantity > 0) {
    return this.addProduct(product, {through: {quantity}})
  } else {
    return this.removeProduct(product)
  }
}

Order.prototype.getQuantity = async function(product) {
  const productId = typeof product === 'number' ? product : product.id
  const item = await db.model('order_item').findOne({
    where: {
      orderId: this.id,
      productId: productId
    }
  })
  return item ? item.quantity : 0
}

Order.prototype.getQuantities = function(options = {}) {
  const mergedOptions = {
    ...options,
    through: {attributes: ['quantity']}
  }
  return this.getProducts(mergedOptions)
}

module.exports = Order
