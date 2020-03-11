const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /[-_a-z0-9]+/
    },
    set(slug) {
      this.setDataValue('slug', slug.toLowerCase())
    }
  },
  inMenu: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  defaultImage: {
    type: Sequelize.TEXT
  }
})

Category.addHook('beforeValidate', category => {
  if (category.name && !category.slug) {
    category.slug = category.name.replace(' ', '-')
  }
})

Category.findBySlug = function(slug, options = {}) {
  const mergedOptions = {
    ...options,
    where: {
      ...(options.where || {}),
      slug: slug.toLowerCase()
    }
  }
  return Category.findOne(mergedOptions)
}

module.exports = Category
