'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      name: 'Cody',
      status: 'user',
      imageUrl: ''
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      name: 'murphy',
      status: 'admin',
      imageUrl: ''
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Succulent',
      description: 'I am a beautiful plant',
      image:
        'https://cdn.shopify.com/s/files/1/1124/9666/products/echeveria-lola_e899a957-9013-4ff8-83be-6e3db7516103_1024x.jpg?v=1500701115',
      price: 55.5
    }),
    Product.create({
      name: 'Rose',
      description: 'I am a beautiful rose',
      image:
        'https://static1.squarespace.com/static/54cebd23e4b02ea7650b9922/54cee6b6e4b06e35d68ec16b/54f4c8fee4b08fac2ceaf8ab/1531330449914/?format=1500w',
      price: 60.9
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
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

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
