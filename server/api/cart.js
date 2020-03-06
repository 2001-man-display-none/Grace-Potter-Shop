const router = require('express').Router({mergeParams: true})
const {Order, Product} = require('../db/models')
module.exports = router

/// TODO: manage session cart on login/logout/signup

const cartMiddleware = (req, res, next) => {
  const user = req.user
  if (user) {
    req.getCart = opts => user.getCart(opts)
    req.getOrCreateCart = opts => user.getOrCreateCart(opts)
  } else {
    req.getCart = (opts = {}) => {
      if (req.session.cartId) {
        return Order.findByPk(req.session.cartId, {
          ...opts,
          where: {...(opts.where || {}), status: 'pending'}
        })
      }
    }
    req.getOrCreateCart = async () => {
      let cart = await req.getCart()
      if (!cart) {
        cart = await Order.create()
      }
      // eslint-disable-next-line require-atomic-updates
      req.session.cartId = cart.id
      return cart
    }
  }
  next()
}

router.use(cartMiddleware)

router.get('/', async (req, res, next) => {
  try {
    const order = await req.getCart({
      include: [
        {
          model: Product,
          through: {attributes: ['quantity']},
          order: [['createAt', 'DESC']]
        }
      ]
    })

    if (order) {
      res.json(order.products)
    } else {
      res.json([])
    }
  } catch (error) {
    next(error)
  }
})

router.post('/checkout', async (req, res, next) => {
  try {
    const order = await req.getCart()
    await order.update({status: 'fulfilled'})
    const newOrder = await Order.findByPk(order.id, {
      include: [{model: Product}],
      through: {attributes: ['quantity']}
    })

    res.status(201).json(newOrder)
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId

    const cart = await req.getOrCreateCart()
    await cart.setQuantity(productId, req.body.quantity)
    const updatedCart = await cart.getQuantities()

    res.status(200).json(updatedCart)
  } catch (error) {
    next(error)
  }
})

router.post('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId

    const cart = await req.getOrCreateCart()
    const prevCount = await cart.getQuantity(productId)
    await cart.setQuantity(productId, prevCount + 1)

    const updatedCart = await cart.getQuantities()

    res.status(201).json(updatedCart)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const order = await req.getCart()
    if (!order) {
      res.json([]).status(204)
      return
    }

    const product = await Product.findByPk(req.params.productId)

    await order.removeProduct(product)

    const newOrder = await req.getCart({
      include: [{model: Product, order: [['createAt', 'DESC']]}]
    })

    res.json(newOrder.products).status(204)
  } catch (error) {
    next(error)
  }
})
