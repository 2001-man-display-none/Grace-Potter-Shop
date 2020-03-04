/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
// const Product = db.model('product')
// const OrderItem = db.model('orderItem')

describe('Cart route', () => {
  // let storedCart

  const orderData = [
    {
      userId: 1,
      status: 'fulfilled'
    },
    {
      userId: 6,
      status: 'pending'
    }
  ]

  beforeEach(async () => {
    await Order.bulkCreate(orderData)
  })

  describe('GET /api/users/:userId/cart', () => {
    it('GET /api/users/:userId/cart', async () => {
      const res = await request(app)
        .get('/api/users/6/cart')
        .expect(200)
    })
  })
})

describe('DELETE /api/users/:userId/cart/productId', () => {
  it('DELETE /api/users/:userId/cart/productId', async () => {
    const res = await request(app)
      .delete('api/users/6/cart/2')
      .expect(204)
  })
})
