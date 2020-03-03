const router = require('express').Router({mergeParams: true})
module.exports = router

router.use('/users', require('./users'))
router.use('/users/:userId/cart', require('./cart'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
