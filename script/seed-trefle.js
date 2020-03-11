/* eslint-disable camelcase */
const seedData = require('./seed-data.json')
const faker = require('faker')
const {
  repeat,
  fakeOrders,
  fakeOrderItems,
  fakeUser,
  fakePrice
} = require('./seed-faker')

const db = require('../server/db')
const {User, Product, OrderItem, Category} = require('../server/db/models')

const maxProductsPerCategory = 40

const filteredSeedData = seedData.filter(plant => plant.images.length >= 1)

//categories: Seeds, flowers, succulents, other
// foliage_texture: ['Coarse', 'Medium', 'Fine', 'null']

function fakeCategories() {
  return [
    {name: 'unused', inMenu: false},
    {name: 'Outdoor Plants', inMenu: true},
    {name: 'Succulents', inMenu: true},
    {name: 'Flowers', inMenu: true},
    {name: 'Other', inMenu: true}
  ]
}

function categorizePlant(plant) {
  const succulentFamily = ['Century-plant family', 'Ocotillo family']
  if (succulentFamily.includes(plant.family_common_name)) {
    return 'Succulents'
  } else if (plant.specifications_mature_height.ft > 6) {
    return 'Outdoor Plants'
  } else if (plant.flower_conspicuous === true) {
    return 'Flowers'
  } else {
    return 'Other'
  }
}

function generateProductData() {
  return filteredSeedData.map(plant => {
    const {
      common_name,
      scientific_name,
      family_common_name,
      growth_moisture_use,
      specifications_mature_height,
      flower_conspicuous,
      images
    } = plant

    const name = common_name ? common_name : scientific_name

    const family = family_common_name
      ? family_common_name.toLowerCase()
      : 'unknown'

    const descriptionParts = [
      family_common_name
        ? `The ${name} comes from the ${family}.`
        : `Meet the ${name}!`,
      specifications_mature_height &&
        specifications_mature_height.ft &&
        `It can grow to a height of up to ${specifications_mature_height.ft} ft.`,
      growth_moisture_use &&
        `It needs a ${growth_moisture_use.toLowerCase()} level of water.`,
      flower_conspicuous && `The ${name} is known for its flowers.`
    ]
    const description = descriptionParts.filter(x => !!x).join(' ')

    return {
      name: name,
      description: description,
      image: images[0].url,
      price: fakePrice(),
      categoryName: categorizePlant(plant)
    }
  })
}

async function seed(quiet = false) {
  const log = quiet ? () => {} : console.log.bind(console)
  await db.sync({force: true})
  log('db synced!')

  const categoryData = fakeCategories()
  const categories = await Promise.all(
    categoryData.map(d => Category.create(d))
  )
  log(`seeded ${categories.length} categories`)

  const categoryMap = {}
  categories.forEach(category => {
    categoryMap[category.name] = {id: category.id, count: 0, products: []}
  })

  const productData = generateProductData()
  const productPromises = productData
    .map(product => {
      const categoryInfo = categoryMap[product.categoryName]
      if (categoryInfo.count < maxProductsPerCategory) {
        product.categoryId = categoryInfo.id
        categoryInfo.count++
        return Product.create(product)
      }
    })
    .filter(p => !!p)
  const products = await Promise.all(productPromises)
  log(`seeded ${products.length} products`)

  const userData = repeat(100, fakeUser)
  const users = await Promise.all(userData.map(d => User.create(d)))
  log(`seeded ${users.length} users`)

  const orders = await fakeOrders(users, products)
  log(`seeded ${orders.length} orders`)

  const itemsData = orders.map(order => fakeOrderItems(order, products))
  const items = await OrderItem.bulkCreate(itemsData.flat())
  log(`seeded ${items.length} order items`)

  log(`seeded successfully`)
}

async function runSeed() {
  faker.seed(999)
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

runSeed()
