const adminsOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    const err = new Error('Sorry, access denied')
    err.status = 401
    return next(err)
  }
  next()
}

const usersOnly = (req, res, next) => {
  if (!req.user) {
    const err = new Error('Please login to access')
    err.status = 401
    return next(err)
  }
  next()
}

module.exports = {adminsOnly, usersOnly}
