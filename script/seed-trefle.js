const seedData = require('./seed-data.json')
const fakerData = require('./seed-faker')
const {User, Product, Order, OrderItem} = require('../server/db/models')

const filteredSeedData = seedData.filter(plant => plant.images.length >= 1)

//categories: Seeds, flowers, succulents, other
// foliage_texture: ['Coarse', 'Medium', 'Fine', 'null']

function categorizePlant(plant) {
  const succulentFamily = ['Century-plant family', 'Ocotillo family']
  if (succulentFamily.includes(plant.family_common_name)) {
    console.log(plant.common_name)
    return 'Succulents'
  } else if (plant.pecifications_mature_height.ft > 6) {
    return 'Exterior Plants'
  } else if (plant.flower_conspicuous === true) {
    return 'Flowers'
  } else {
    return 'Other'
  }
}

filteredSeedData.map(plant => {
  const plantData = {
    name: plant.common_name,
    description: `The ${plant.common_name} comes from the ${plant.family_common_name} family. It need a ${plant.growth_moisture_use} level of water.`,
    image: plant.images[0],
    price: Math.random() * 50,
    category: categorizePlant(plant)
  }

  Product.create(plantData)
})
