// /* global describe beforeEach it */

// const {expect} = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// const Product = db.model('product')

// describe('User routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/product/:productId', () => {
//     const roseName = 'rose'
//     const roseDescription = 'this is a test description'
//     const rosePrice = 500

//     beforeEach(() => {
//       return Product.create({
//         name: roseName,
//         description: roseDescription,
//         price: rosePrice
//       })
//     })

//     it('GET /api/product/:productId', async () => {
//       const res = await request(app)
//         .get('/api/product/:productId')
//         .expect(200)
//       console.log(res.body)
//       expect(res.body).to.be.an('object')
//       expect(res.body.name).to.be.equal(roseName)
//       expect(res.body.description).to.be.equal(roseDescription)
//       expect(res.body.price).to.be.equal(rosePrice)
//     })
//   }) // end describe('/api/users')
// }) // end describe('User routes')
