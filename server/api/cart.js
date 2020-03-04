const router = require('express').Router({mergeParams: true})
const {Order, Product, OrderItem} = require('../db/models')
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
    const updateItem = await OrderItem.findOne({
      where: {productId: req.params.productId}
    })
    const qty = req.body
    if (updateItem) {
      await updateItem.update(qty)
      res.status(200).json(updateItem)
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
    //await order.removeProduct(product)
    await order.delete(product)

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
