const router = require('express').Router()
const {Category, Product} = require('../db/models')
const {adminsOnly} = require('../auth/privileges')
const {calculateLimitAndOffset} = require('paginate-info')
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
    const pageNum = Number(req.query.pageNum) + 1

    const pageSize = 12
    const {limit, offset} = calculateLimitAndOffset(pageNum, pageSize)

    const category = await Category.findBySlug(req.params.categorySlug, {
      include: [{model: Product}]
    })
    if (category) {
      const pageCount = Math.ceil(category.length / pageSize)

      const paginatedData = category.slice(offset, offset + limit)
      console.log('paginatedData', paginatedData)
      console.log('pageCount', pageCount)
      res.json(category)
      // res.status(200).json({
      //   categoryData: {result: paginatedData, pageCount}
      // })
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
