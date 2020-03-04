/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe.only('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('admin-only routes', () => {
    let cody
    let admin

    async function adminLogin() {
      const agent = request.agent(app)
      await agent
        .post('/auth/login')
        .send({email: 'admin@admin.admin', password: 'password'})
      return agent
    }

    const codysEmail = 'cody@puppybook.com'
    beforeEach(async () => {
      cody = await User.create({
        name: 'Cody',
        email: codysEmail
      })

      admin = await User.create({
        name: 'admin',
        email: 'admin@admin.admin',
        password: 'password',
        role: 'admin'
      })
    })

    describe('/api/users/', () => {
      it("doesn't work for guests", async () => {
        const res = await request(app)
          .get('/api/users')
          .expect(401)
      })

      it('does work for admins', async () => {
        const agent = await adminLogin()
        const res = await agent.get('/api/users').expect(200)
        expect(res.body).to.be.an('array')
        expect(res.body[0].email).to.be.equal(codysEmail)
      })
    })
  })
})
