'use strict'

const faker = require('faker')

const db = require('../server/db')
const {User, Product, Order, OrderItem} = require('../server/db/models')

function repeat(n, f) {
  return Array(n)
    .fill()
    .map(f)
}

async function seed(quiet = false) {
  const log = quiet ? () => {} : console.log.bind(console)
  await db.sync({force: true})
  log('db synced!')

  const userData = repeat(100, fakeUser)
  const users = await Promise.all(userData.map(d => User.create(d)))
  log(`seeded ${users.length} users`)

  const productData = repeat(50, fakeProduct)
  const products = await Promise.all(productData.map(p => Product.create(p)))
  log(`seeded ${products.length} products`)

  const orders = await fakeOrders(users, products)
  log(`seeded ${orders.length} orders`)

  const itemsData = orders.map(order => fakeOrderItems(order, products))
  const items = await OrderItem.bulkCreate(itemsData.flat())
  log(`seeded ${items.length} order items`)

  log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

function fakeUser() {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.random.arrayElement(['password', '123'])
  }
}

const plant = () => {
  const adjective = faker.random.arrayElement([
    faker.commerce.color(),
    faker.commerce.productAdjective()
  ])
  const species = faker.lorem.word()
  const genus = faker.lorem.word()
  return `${adjective} ${genus} ${species}`
}

const accessory = () => {
  const material = faker.commerce.productMaterial
  const nonsense = faker.random.word
  const type = faker.random.arrayElement(['soil', 'pot'])
  return [material, nonsense, type].join(' ')
}

function fakeProduct() {
  return {
    name: plant(),
    description: faker.lorem.sentence(),
    image: faker.image.nature(),
    price: faker.commerce.price()
  }
}

function fakeOrder(user, status) {
  return {
    user: user,
    status: status
  }
}

function fakeOrders(users, products) {
  const promises = []
  const addFake = (...args) => promises.push(Order.create(fakeOrder(...args)))

  // orders belonging to users
  users.map(user => {
    // at most one pending order
    if (faker.random.boolean) {
      addFake(user, 'pending', products)
    }
    // any number of completed orders
    repeat(faker.random.arrayElement([0, 0, 1, 4, 20]), () => {
      addFake(user, 'fulfilled', products)
    })
  })

  // orders belonging to guests
  repeat(10, () => {
    const status = faker.random.arrayElement(['pending', 'fulfilled'])
    addFake(null, status, products)
  })

  return Promise.all(promises)
}

function fakeOrderItems(order, products) {
  const items = []
  const sizes = [1, 5, 10]
  const legalSizes = order.status === 'pending' ? sizes : [0, ...sizes]
  const used = {}
  repeat(faker.random.arrayElement(legalSizes), () => {
    const product = faker.random.arrayElement(products)
    if (used[product.id]) return
    used[product.id] = true

    items.push({
      productId: product.id,
      orderId: order.id,
      quantity: faker.random.arrayElement([1, 1, 1, 1, 5, 60])
    })
  })
  return items
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
