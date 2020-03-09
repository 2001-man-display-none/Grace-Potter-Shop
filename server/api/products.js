const router = require('express').Router()
const {Product} = require('../db/models')
const {adminsOnly} = require('../auth/privileges')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    if (products) {
      res.json(products)
    }
  } catch (err) {
    res.status(404).send(err)
  }
})

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

//Admin only access: api/products
router.post('/', adminsOnly, async (req, res, next) => {
  try {
    let product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/:productId', adminsOnly, async (req, res, next) => {
  try {
    let productId = req.params.productId
    let product = await Product.findByPk(productId)
    if (!product) {
      res.sendStatus(404)
    } else {
      await product.destroy()
      res.sendStatus(204)
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

router.put('/:productId', adminsOnly, async (req, res, next) => {
  try {
    let productId = req.params.productId
    let product = await Product.findByPk(productId)
    if (!product) {
      res.sendStatus(404)
    } else {
      let newProduct = await product.update(req.body)
      res.status(200).json(newProduct)
    }
  } catch (err) {
    res.status(500).send(err)
  }
})
