const router = require('express').Router({mergeParams: true})
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = req.user
    let pastOrders = await user.getInvoices({
      include: [{model: Product}],
      through: {attributes: ['quantity']}
    })
    if (pastOrders) {
      res.json(pastOrders)
    } else {
      res.status(404).send('Your order history is empty!')
    }
  } catch (err) {
    next(err)
  }
})
