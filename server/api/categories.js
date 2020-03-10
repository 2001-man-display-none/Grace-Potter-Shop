const router = require('express').Router()
const {Category, Product} = require('../db/models')
const {adminsOnly} = require('../auth/privileges')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

router.get('/menu', async (req, res, next) => {
  try {
    const categories = await Category.findAll({where: {inMenu: true}})
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

router.get('/:categorySlug', async (req, res, next) => {
  try {
    const category = await Category.findBySlug(req.params.categorySlug, {
      include: [{model: Product}]
    })
    if (category) {
      res.json(category.products)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
