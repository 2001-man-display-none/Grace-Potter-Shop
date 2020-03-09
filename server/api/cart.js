const router = require('express').Router({mergeParams: true})
const {Order, Product} = require('../db/models')
module.exports = router

// /api/cart
router.get('/', async (req, res, next) => {
  try {
    const order = await req.cart.get({
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
    const order = await req.cart.get()
    await order.update({status: 'fulfilled'})
    req.cart.clear()
    const newOrder = await Order.findByPk(order.id, {
      include: [{model: Product}],
      through: {attributes: ['quantity']}
    })

    res.status(201).json(newOrder)
  } catch (error) {
    next(error)
  }
})

router.patch('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId

    const cart = await req.cart.getOrCreate()
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

    const cart = await req.cart.getOrCreate()
    const prevCount = await cart.getQuantity(productId)
    await cart.setQuantity(productId, prevCount + req.body.quantity)

    const updatedCart = await cart.getQuantities()

    res.status(201).json(updatedCart)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const order = await req.cart.get()
    if (!order) {
      res.json([]).status(204)
      return
    }

    const product = await Product.findByPk(req.params.productId)

    await order.removeProduct(product)

    const newOrder = await req.cart.get({
      include: [{model: Product, order: [['createAt', 'DESC']]}]
    })

    res.json(newOrder.products).status(204)
  } catch (error) {
    next(error)
  }
})
