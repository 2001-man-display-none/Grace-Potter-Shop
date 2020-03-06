const adminsOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    res.sendStatus(401)
  } else {
    next()
  }
}

const usersOnly = (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401)
  } else {
    next()
  }
}

const guestsOnly = (req, res, next) => {
  if (req.user) {
    res.sendStatus(401)
  } else {
    next()
  }
}

module.exports = {adminsOnly, usersOnly, guestsOnly}
