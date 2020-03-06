const router = require('express').Router({mergeParams: true})
const {OrderItem, Order, Product} = require('../db/models')
module.exports = router

// /api/cart
router.get('/', async (req, res, next) => {
  try {
    const user = req.user
    const order = await user.getCart({
      include: [{model: Product, order: [['createAt', 'DESC']]}]
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

//quantity buttons need to pass down productId & qtyAmt
router.patch('/:itemId', async (req, res, next) => {
  try {
    const user = req.user
    const itemId = req.params.itemId
    const order = await user.getCart({
      include: [{model: Product, order: [['createAt', 'DESC']]}]
    })
    if (order) {
      await order.setQuantity(itemId, req.body.quantity)
      const newOrder = await user.getCart({
        include: [{model: Product, order: [['createAt', 'DESC']]}]
      })
      res.json(newOrder.products).status(200)
    }
  } catch (error) {
    next(error)
  }
})

//deleted button needs productId passed through
router.delete('/:productId', async (req, res, next) => {
  try {
    const user = req.user
    const order = await user.getCart()
    const product = await Product.findByPk(req.params.productId)

    await order.removeProduct(product)

    const newOrder = await user.getCart({
      include: [
        {model: Product, as: 'orderItem', order: [['createAt', 'DESC']]}
      ]
    })

    res.json(newOrder.products).status(204)
  } catch (error) {
    next(error)
  }
})

router.post('/checkout', async (req, res, next) => {
  try {
    const user = req.user
    const order = await user.getCart()
    await order.update({status: 'fulfilled'})
    const newOrder = await Order.findByPk(order.id, {
      include: [{model: Product}]
    })

    res.status(201).json(newOrder)
  } catch (error) {
    next(error)
  }
})
