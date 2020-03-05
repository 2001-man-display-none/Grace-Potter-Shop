const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe.only('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    let cody
    beforeEach(async () => {
      cody = await User.create({
        name: 'Cody',
        email: 'cody@puppybook.com',
        password: 'bones'
      })
    })

    describe('correctPassword', () => {
      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')

    describe('getCart', () => {
      it('finds a cart when present', async () => {
        const cart = await cody.createOrder({status: 'pending'})
        const gotCart = await cody.getCart()
        expect(gotCart.id).to.equal(cart.id)
      })

      it('returns null when no cart present', async () => {
        const gotCart = await cody.getCart()
        return expect(gotCart).to.be.null
      })

      it('ignores fulfilled orders', async () => {
        const cart = await cody.createOrder({status: 'fulfilled'})
        const gotCart = await cody.getCart()
        return expect(gotCart).to.be.null
      })

      it('accepts options', async () => {
        await cody.createOrder({status: 'pending'})
        const cart = await cody.getCart({include: [{model: User}]})
        expect(cart.user.id).to.equal(cody.id)
      })
    })

    describe('getOrCreateCart', () => {
      it('finds a cart when present', async () => {
        const cart = await cody.createOrder({status: 'pending'})
        const gotCart = await cody.getOrCreateCart()
        expect(gotCart.id).to.equal(cart.id)
        const allOrders = await cody.getOrders()
        expect(allOrders).to.have.length(1)
      })

      it("creates a cart if one doesn't exist", async () => {
        const cart = await cody.getOrCreateCart()
        expect(cart).to.be.an('object')
        const allOrders = await cody.getOrders()
        expect(allOrders).to.have.length(1)
      })

      it('ignores fulfilled orders', async () => {
        const old = await cody.createOrder({status: 'fulfilled'})
        const cart = await cody.getOrCreateCart()
        expect(cart.id).to.not.equal(old.id)
        const allOrders = await cody.getOrders()
        expect(allOrders).to.have.length(2)
      })
    })

    describe('getInvoices', () => {
      it('returns all invoices', async () => {
        const order1 = await cody.createOrder({status: 'fulfilled'})
        const order2 = await cody.createOrder({status: 'fulfilled'})
        const invoices = await cody.getInvoices()
        const invoiceIds = invoices.map(invoice => invoice.id)
        expect(invoiceIds).to.contain(order1.id)
        expect(invoiceIds).to.contain(order2.id)
      })

      it('ignores pending orders', async () => {
        const cart = await cody.createOrder({status: 'pending'})
        const invoices = await cody.getInvoices()
        const invoiceIds = invoices.map(invoice => invoice.id)
        expect(invoiceIds).to.not.contain(cart.id)
      })

      it('accepts options', async () => {
        await cody.createOrder({status: 'fulfilled'})
        const invoices = await cody.getInvoices({include: [{model: User}]})
        expect(invoices[0].user.id).to.equal(cody.id)
      })
    })
  }) // end describe('instanceMethods')
}) // end describe('User model')
