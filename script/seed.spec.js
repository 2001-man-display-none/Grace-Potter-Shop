'use strict'
/* global describe it */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const {expect} = chai

const seed = require('./seed')
const {User, Product, Order, OrderItem} = require('../server/db/models')

describe('seed script', () => {
  it('completes successfully', async function() {
    this.timeout(30000)
    await seed(true)
  })

  describe('users', () => {
    it('creates at least 10 users', () => {
      expect(User.count()).to.eventually.be.gte(10)
    })

    it('creates at least one user without any orders', () => {
      return expect(
        User.findAll({
          include: [{model: Order, where: {id: null}, required: false}]
        })
      ).to.eventually.be.not.empty
    })

    it('creates at least one user with orders', () => {
      return expect(
        User.findAll({
          include: [{model: Order}]
        })
      ).to.eventually.be.not.empty
    })
  })

  describe('orders', () => {
    it('creates at least 10 orders', () => {
      expect(Order.count()).to.eventually.be.gte(10)
    })

    it('creates at least one order not belonging to a user', () => {
      return expect(
        Order.findAll({
          include: [{model: User, where: {id: null}, required: false}]
        })
      ).to.eventually.be.not.empty
    })

    it('creates at least one order belonging to a user', () => {
      return expect(
        Order.findAll({
          include: [{model: User}]
        })
      ).to.eventually.be.not.empty
    })
  })
})
