const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/:productId', async (req, res, next) => {
  try {
    let productId = req.params.productId
    let product = await Product.findByPk(productId)
    if (product) {
      res.json(product)
    }
  } catch (err) {
    res.status(500).send(err)
  }
})
