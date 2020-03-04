const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    beforeEach(() => {
      return Product.create({
        name: 'catctus',
        description: "it's a cat *and* a cactus!",
        price: 11.99
      })
    })

    it('returns a list of all products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('catctus')
    })
  })

  describe('/api/product/:productId', () => {
    beforeEach(() => {
      return Product.create({
        name: 'catctus',
        description: "it's a cat *and* a cactus!",
        price: 11.99
      })
    })

    it('GET /api/product/:productId', async () => {
      const res = await request(app)
        .get('/api/product/:productId')
        .expect(200)
      console.log(res.body)
      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('cactus')
      expect(res.body.description).to.be.equal("it's a cat *and* a cactus!")
      expect(res.body.price).to.be.equal(11.99)
    })
  })
})
