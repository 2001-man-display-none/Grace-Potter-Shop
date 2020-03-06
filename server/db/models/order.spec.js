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

    let product
    let order

    beforeEach(async () => {
      order = await Order.create()
      product = await Product.create({
        name: 'product a',
        price: 5
      })
    })

    describe('getQuantities', () => {
      it('includes quantity as .order_item.quantity', async () => {
        await order.addProduct(product, {through: {quantity: 10}})
        const products = await order.getQuantities()
        expect(products[0].order_item.quantity).to.equal(10)
      })
    })

    describe('setQuantity', () => {
      it('adds an item to the order if not present', async () => {
        await order.setQuantity(product, 2)
        const products = await order.getProducts({
          joinTableAttributes: ['quantity']
        })
        expect(products).to.be.an('array')
        expect(products[0].id).to.equal(product.id)
        expect(products[0].order_item.quantity).to.equal(2)
      })

      it('can accept the product as an id', async () => {
        await order.setQuantity(product.id, 2)
        const products = await order.getProducts({
          joinTableAttributes: ['quantity']
        })
        expect(products).to.be.an('array')
        expect(products[0].id).to.equal(product.id)
        expect(products[0].order_item.quantity).to.equal(2)
      })

      it('updates the quantity if item already present', async () => {
        await order.setQuantity(product, 2)
        await order.setQuantity(product, 1)
        const products = await order.getProducts({
          joinTableAttributes: ['quantity']
        })
        expect(products[0].id).to.equal(product.id)
        expect(products[0].order_item.quantity).to.equal(1)
      })

      it('removes an item from the order if the quantity is 0', async () => {
        await order.setQuantity(product, 2)
        await order.setQuantity(product, 0)
        const products = await order.getProducts()
        return expect(products).to.be.empty
      })

      it('removes idempotently', async () => {
        await order.setQuantity(product, 2)
        await order.setQuantity(product, 0)
        await order.setQuantity(product, 0)
        const products = await order.getProducts()
        return expect(products).to.be.empty
      })
    })
  })
})
