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
  const OrderItem = db.model('order_item')
  const productId = typeof product === 'object' ? product.id : product
  if (quantity > 0) {
    return OrderItem.upsert({orderId: this.id, productId, quantity})
  } else {
    return this.removeProduct(product)
  }
}

Order.prototype.getQuantity = async function(product) {
  const OrderItem = db.model('order_item')
  const productId = typeof product === 'object' ? product.id : product
  const item = await OrderItem.findOne({
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
