const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const {expect} = chai

const db = require('../index')
const Order = require('./order')

describe('Cart model', () => {
  describe('field validation', () => {
    it('is active by default', () => {
      const order = Order.build()
      expect(order.status).to.equal('pending')
    })
  })
})
