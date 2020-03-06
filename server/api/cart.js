const router = require('express').Router({mergeParams: true})
const {User, Order, Product} = require('../db/models')
module.exports = router

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
router.put('/:productId', async (req, res, next) => {
  try {
    const user = req.user
    const productId = req.params.productId
    if (user) {
      const order = await user.getCart()
      await order.setQuantity(productId, req.body)
      const updatedCart = await order.getQuantities()

      res.status(200).json(updatedCart)
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
      include: [{model: Product, order: [['createAt', 'DESC']]}]
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
