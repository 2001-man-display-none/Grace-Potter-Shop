const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const User = db.model('user')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/products', () => {
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

  describe('GET /api/products/:productId', () => {
    let catctus

    beforeEach(async () => {
      catctus = await Product.create({
        id: 2,
        name: 'catctus',
        description: "it's a cat *and* a cactus!",
        price: 11.99
      })
    })

    it('returns a single product', async () => {
      const res = await request(app)
        .get(`/api/products/${catctus.id}`)
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('catctus')
      expect(res.body.description).to.be.equal("it's a cat *and* a cactus!")
      expect(res.body.price).to.be.equal('11.99')
    })
  })

  describe('admin-only product routes', () => {
    let hoya
    let admin

    async function adminLogin() {
      const agent = request.agent(app)
      await agent
        .post('/auth/login')
        .send({email: 'admin@admin.admin', password: 'password'})
      return agent
    }

    beforeEach(async () => {
      let newHoya = await Product.create({
        id: 3,
        name: 'Hoya',
        description: 'hoya doing?',
        price: '15.50'
      })

      admin = await User.create({
        name: 'admin',
        email: 'admin@admin.admin',
        password: 'password',
        role: 'admin'
      })

      hoya = await Product.findByPk(newHoya.id)
    })

    describe('POST /api/products', () => {
      it("doesn't work for guests", async () => {
        const res = await request(app)
          .post('/api/products')
          .expect(401)
      })

      it('does work for admins', async () => {
        const agent = await adminLogin()
        const res = await agent
          .post('/api/products')
          .send({
            name: 'Oregano',
            price: '99.99',
            description: 'oregano gangster'
          })
          .expect(201)

        expect(res.body).to.be.an('object')
        expect(res.body.name).to.deep.equal('Oregano')
        expect(res.body.price).to.deep.equal('99.99')
        expect(res.body.description).to.deep.equal('oregano gangster')
      })
    })

    describe('PUT /api/products/:productId', () => {
      it("doesn't work for guests", async () => {
        const res = await request(app)
          .put(`/api/products/${hoya.id}`)
          .expect(401)
      })

      it('does work for admins', async () => {
        const agent = await adminLogin()
        //before the put request
        expect(hoya.price).to.deep.equal('15.50')
        //put request
        const res = await agent.put(`/api/products/${hoya.id}`).send({
          price: '10.99'
        })
        //after the put request price has changed
        expect(res.body).to.be.an('object')
        expect(res.body.name).to.deep.equal('Hoya')
        expect(res.body.price).to.deep.equal('10.99')
        expect(res.body.description).to.deep.equal('hoya doing?')
      })
    })

    describe('DELETE /api/products/:productId', () => {
      it("doesn't work for guests", async () => {
        const res = await request(app)
          .delete(`/api/products/${hoya.id}`)
          .expect(401)
      })

      it('does work for admins', async () => {
        const agent = await adminLogin()
        const res = await agent.delete(`/api/products/${hoya.id}`).expect(204)
        const deletedHoya = await Product.findByPk(hoya.id)

        expect(deletedHoya).to.equal(null)
      })
    })
  })
})
