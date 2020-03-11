const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const {expect} = chai

const db = require('../index')
const Category = require('./category')

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('can generate slug from name', async () => {
    const category = Category.build({name: 'Extreme Sports'})
    await category.validate()
    expect(category.slug).to.be.equal('extreme-sports')
  })

  describe('class methods', () => {
    let categoryTea
    let categoryCoffee

    beforeEach(async () => {
      categoryTea = await Category.create({name: 'Tea'})
      categoryCoffee = await Category.create({name: 'Coffee'})
    })

    describe('findBySlug', () => {
      it('finds a category', async () => {
        const found = await Category.findBySlug('Tea')
        expect(found.id).to.equal(categoryTea.id)
      })

      it('is case insensitive', async () => {
        const found = await Category.findBySlug('coffee')
        expect(found.id).to.equal(categoryCoffee.id)
      })

      it('accepts options', async () => {
        const product = await categoryTea.createProduct({
          price: 10,
          name: 'green'
        })
        const found = await Category.findBySlug('tea', {
          include: [{model: db.model('product')}]
        })
        const productIds = found.products.map(p => p.id)
        expect(productIds).to.have.members([product.id])
      })
    })
  })
})
