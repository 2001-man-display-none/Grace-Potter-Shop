const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const {expect} = chai

const Order = require('./order')
const db = require('../index')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('field validation', () => {
    it('is pending by default', () => {
      const order = Order.build()
      expect(order.status).to.equal('pending')
    })
  })

  describe('instance methods', () => {
    const Product = db.model('product')

    let product1
    let product2
    let order1
    let order2

    beforeEach(async () => {
      order1 = await Order.create()
      order2 = await Order.create()
      product1 = await Product.create({
        name: 'product a',
        price: 5
      })
      product2 = await Product.create({
        name: 'product b',
        price: 10
      })
    })

    describe('getQuantities', () => {
      it('includes quantity as .order_item.quantity', async () => {
        await order1.addProduct(product1, {through: {quantity: 10}})
        const products = await order1.getQuantities()
        expect(products[0].order_item.quantity).to.equal(10)
      })
    })

    describe('getQuantity', () => {
      it('returns the quantity of a product in the order', async () => {
        await order1.addProduct(product1, {through: {quantity: 10}})
        const quantity = await order1.getQuantity(product1)
        expect(quantity).to.be.equal(10)
      })

      it('can accept a numeric product id', async () => {
        await order1.addProduct(product1, {through: {quantity: 10}})
        const quantity = await order1.getQuantity(product1.id)
        expect(quantity).to.be.equal(10)
      })

      it('returns 0 if the product is not present', async () => {
        const quantity = await order1.getQuantity(product1.id)
        expect(quantity).to.be.equal(0)
      })
    })

    describe('setQuantity', () => {
      it('adds an item to the order if not present', async () => {
        await order1.setQuantity(product1, 2)
        const products = await order1.getProducts({
          joinTableAttributes: ['quantity']
        })
        expect(products).to.be.an('array')
        expect(products[0].id).to.equal(product1.id)
        expect(products[0].order_item.quantity).to.equal(2)
      })

      it('can accept the product as an id', async () => {
        await order1.setQuantity(product1.id, 2)
        const products = await order1.getProducts({
          joinTableAttributes: ['quantity']
        })
        expect(products).to.be.an('array')
        expect(products[0].id).to.equal(product1.id)
        expect(products[0].order_item.quantity).to.equal(2)
      })

      it('updates the quantity if item already present', async () => {
        await order1.setQuantity(product1, 1)
        await order1.setQuantity(product1, 2)
        const products = await order1.getProducts({
          joinTableAttributes: ['quantity']
        })
        expect(products[0].id).to.equal(product1.id)
        expect(products[0].order_item.quantity).to.equal(2)
      })

      it('removes an item from the order if the quantity is 0', async () => {
        await order1.setQuantity(product1, 2)
        await order1.setQuantity(product1, 0)
        const products = await order1.getProducts()
        return expect(products).to.be.empty
      })

      it('removes idempotently', async () => {
        await order1.setQuantity(product1, 2)
        await order1.setQuantity(product1, 0)
        await order1.setQuantity(product1, 0)
        const products = await order1.getProducts()
        return expect(products).to.be.empty
      })
    })

    describe('mergeFrom', () => {
      it('adds the items in another order to this one', async () => {
        await order1.setQuantity(product1, 5)
        await order2.setQuantity(product2, 10)
        await order1.mergeFrom(order2)
        const products = await order1.getProducts()
        const itemQuantities = products.map(item => [
          item.id,
          item.order_item.quantity
        ])
        expect(itemQuantities).to.have.deep.members([
          [product1.id, 5],
          [product2.id, 10]
        ])
      })

      it('takes the larger quantity if an item is in both orders', async () => {
        await order1.setQuantity(product1, 5)
        await order1.setQuantity(product2, 3)
        await order2.setQuantity(product1, 4)
        await order2.setQuantity(product2, 10)
        await order1.mergeFrom(order2)
        const products = await order1.getProducts()
        const itemQuantities = products.map(item => [
          item.id,
          item.order_item.quantity
        ])
        expect(itemQuantities).to.have.deep.members([
          [product1.id, 5],
          [product2.id, 10]
        ])
      })
    })
  })
})
