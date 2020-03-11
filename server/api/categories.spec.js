const {expect} = require('chai')
const request = require('supertest')

const app = require('../index')
const db = require('../db')
const {Category} = require('../db/models')

describe('Category routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let succulents
  let lawnGnomes

  beforeEach(async () => {
    succulents = await Category.create({name: 'Succulents', inMenu: true})
    lawnGnomes = await Category.create({name: 'Lawn Gnomes'})
  })

  describe('GET /', () => {
    it('lists all categories', async () => {
      const res = await request(app)
        .get('/api/categories/')
        .expect(200)
      const names = res.body.map(category => category.name)
      expect(names).to.have.members(['Succulents', 'Lawn Gnomes'])
    })
  })

  describe('GET /menu', () => {
    it('lists menu categories only', async () => {
      const res = await request(app)
        .get('/api/categories/menu')
        .expect(200)
      const names = res.body.map(category => category.name)
      expect(names).to.have.members(['Succulents'])
    })
  })

  describe('GET /:categorySlug', () => {
    it('retrieves the products in a category', async () => {
      const catctus = succulents.createProduct({name: 'Catctus', price: 100})
      const res = await request(app)
        .get('/api/categories/succulents')
        .expect(200)
      const names = res.body.products.map(category => category.name)
      expect(names).to.have.members(['Catctus'])
    })

    it('returns 404 if category not present', async () => {
      await request(app)
        .get('/api/categories/submarine-sandwiches')
        .expect(404)
    })
  })
})
