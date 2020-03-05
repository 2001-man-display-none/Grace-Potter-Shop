const router = require('express').Router({mergeParams: true})
const {User, Order, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {userId: req.params.userId, status: 'pending'},
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

router.put('/:productId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const productId = req.params.productId
    if (user) {
      const userCart = await user.getCart()
      await userCart.setQuantity(productId, req.body)
      const updatedCart = await userCart.getQuantities()
      res.status(200).json(updatedCart)
    }
  } catch (error) {
    next(error)
  }
})
//deleted button needs productId passed through
router.delete('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    const order = await Order.findOne({
      where: {userId: req.params.userId, status: 'pending'}
    })

    await order.removeProduct(product)

    const newOrder = await Order.findOne({
      where: {userId: req.params.userId, status: 'pending'},
      include: [{model: Product, order: [['createAt', 'DESC']]}]
    })
    res.json(newOrder.products).status(204)
  } catch (error) {
    next(error)
  }
})
