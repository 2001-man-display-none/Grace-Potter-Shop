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

Order.prototype.mergeFrom = async function(otherOrder) {
  const thisQuantities = await this.getQuantities()
  const otherQuantities = await otherOrder.getQuantities()

  const oldQuantities = new Map(
    thisQuantities.map(item => [item.id, item.order_item.quantity])
  )

  // Note: if this turns out to be a bottleneck we could bulk insert instead.
  const updates = otherQuantities.map(item => {
    const id = item.id
    const quantity = item.order_item.quantity
    if (quantity > (oldQuantities.get(id) || 0)) {
      return this.setQuantity(id, quantity)
    }
  })

  await Promise.all(updates)
}

Order.findCartByPk = function(pk, options = {}) {
  const mergedOptions = {
    ...options,
    where: {...(options.where || {}), status: 'pending'}
  }
  return Order.findByPk(pk, mergedOptions)
}

module.exports = Order
