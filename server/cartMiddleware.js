const {Order} = require('./db/models')

class CartMiddleware {
  constructor(req) {
    this.req = req
  }

  get(options) {
    return this.req.user
      ? this.req.user.getCart(options)
      : this.getGuestCart(options)
  }

  getOrCreate() {
    return this.req.user
      ? this.req.user.getOrCreateCart()
      : this.getOrCreateGuestCart()
  }

  getUserCart(options) {
    return this.req.user ? this.req.user.getCart(options) : null
  }

  getGuestCart(options) {
    const cartId = this.req.session.cartId
    if (cartId) {
      return Order.findCartByPk(cartId, options)
    } else {
      return null
    }
  }

  async getOrCreateGuestCart() {
    let cart = this.getGuestCart()
    if (!cart) {
      cart = await Order.create()
      this.req.session.cartId = cart.id
    }
    return cart
  }

  clear() {
    this.req.session.cartId = null
  }

  async saveToUser() {
    if (this.req.user && this.req.session.cartId) {
      const guestCart = await this.getGuestCart()
      const userCart = await this.getUserCart()

      if (guestCart && !userCart) {
        guestCart.setUser(this.req.user)
        this.req.session.cartId = null
      } else {
        await userCart.mergeFrom(guestCart)
        this.req.session.cartId = null
        await guestCart.destroy()
      }
    }
  }
}

function cartMiddleware(req, res, next) {
  req.cart = new CartMiddleware(req)
  next()
}

module.exports = cartMiddleware
