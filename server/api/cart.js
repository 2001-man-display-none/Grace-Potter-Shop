const router = require('express').Router({mergeParams: true})
const {Order, Product} = require('../db/models')
module.exports = router

const getGuestCart = (req, options = {}) => {
  const cartId = req.session.cartId
  if (cartId) {
    const mergedOptions = {
      ...options,
      where: {...(options.where || {}), status: 'pending'}
    }
    return Order.findByPk(cartId, mergedOptions)
  } else {
    return null
  }
}

const getOrCreateGuestCart = async (req, options) => {
  let cart = getGuestCart(req, options)
  if (cart) {
    return cart
  } else {
    return Order.create(options)
  }
}

const getCart = async (req, options) => {
  const user = req.user
  if (user) {
    return user.getCart(options)
  } else {
    return getGuestCart(req, options)
  }
}

const getOrCreateCart = async (req, options) => {
  const user = req.user
  if (user) {
    return user.getOrCreateCart(options)
  } else {
    return getOrCreateGuestCart(req, options)
  }
}

router.get('/', async (req, res, next) => {
  try {
    const order = await getCart(req, {
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

router.delete('/:productId', async (req, res, next) => {
  try {
    const order = await getCart(req)
    if (!order) {
      res.json([]).status(204)
      return
    }

    const product = await Product.findByPk(req.params.productId)

    await order.removeProduct(product)

    const newOrder = await getCart(req, {
      include: [{model: Product, order: [['createAt', 'DESC']]}]
    })

    res.json(newOrder.products).status(204)
  } catch (error) {
    next(error)
  }
})

router.post('/checkout', async (req, res, next) => {
  try {
    const order = await getCart(req)
    await order.update({status: 'fulfilled'})
    const newOrder = await Order.findByPk(order.id, {
      include: [{model: Product}],
      through: {attributes: ['quantity']}
    })
    console.log(newOrder)
    res.status(201).json(newOrder)
  } catch (error) {
    next(error)
  }
})
