const router = require('express').Router({mergeParams: true})
const {Order, Product, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // console.log('USER', req.params.userId)
    const [order] = await Order.findAll({
      where: {userId: req.params.userId}
    })

    if (order) {
      const itemList = await OrderItem.findAll({where: {orderId: order.id}})

      /* itemList is an array, must loop through (.map doesn't work) to retrieve the productIds only in order to
       find each product instance using findByPK*/
      const items = []
      for (let i = 0; i < itemList.length; i++) {
        const item = await Product.findByPk(itemList[i].productId)
        items.push(item)
      }

      //sorting items in cart by lastest added
      items.sort((a, b) => b.createdAt - a.createdAt)

      res.json(items)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
