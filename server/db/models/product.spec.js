const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const {expect} = chai

const db = require('../index')
const Product = require('./product')

describe('Product model', () => {
  describe('field validation', () => {
    const tryToBuild = data => {
      const product = Product.build(data)
      return product.validate()
    }

    it('requires a product name', () => {
      return expect(
        tryToBuild({
          price: 10.01
        })
      ).to.eventually.be.rejected
    })

    it('it requires a price', () => {
      return expect(
        tryToBuild({
          name: 'bees!!!!!'
        })
      ).to.eventually.be.rejected
    })
  })
})
