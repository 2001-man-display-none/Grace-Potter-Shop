const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM(['admin', 'user']),
    allowNull: false,
    defaultValue: 'user'
  },
  image: {
    type: Sequelize.STRING,
    defaultValue:
      'https://worldofsucculents.com/wp-content/uploads/2016/01/Hoya-kerrii.jpg'
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.prototype.getCart = function(options) {
  const Order = db.model('order')
  const mergedOptions = {
    ...(options || {}),
    where: {
      ...((options && options.where) || {}),
      ...{status: 'pending', userId: this.id}
    }
  }
  return Order.findOne(mergedOptions)
}

User.prototype.getOrCreateCart = async function() {
  const Order = db.model('order')
  const [cart, isNew] = await Order.findOrCreate({
    where: {userId: this.id, status: 'pending'}
  })
  return cart
}

User.prototype.getInvoices = function(options) {
  const mergedOptions = {
    ...(options || {}),
    where: {
      ...((options && options.where) || {}),
      ...{status: 'fulfilled'}
    }
  }
  return this.getOrders(mergedOptions)
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
