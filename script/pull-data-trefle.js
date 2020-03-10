/* eslint-disable camelcase */
const {apiKey} = require('../secrets')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

const url = 'https://trefle.io/api/plants/'
const pageLimit = 100

//getting product data from Trefle API
//**REMEMBER use your own personal Trefle API key
const fetchPlantsPage = async pageNum => {
  const res = await axios.get(url, {
    params: {
      page: pageNum,
      token: apiKey,
      complete_data: true
    }
  })
  const totalPages = res.headers['total-pages']
  return {data: res.data, totalPages}
}

const fetchAllPlants = async () => {
  const pages = []
  const firstPage = await fetchPlantsPage(1)
  pages.push(firstPage.data)
  const maxPages = Math.min(pageLimit, firstPage.totalPages)

  for (let i = 2; i < maxPages; i++) {
    const pageData = await fetchPlantsPage(i)
    pages.push(pageData.data)
  }

  return pages.flat()
}

const fetchSinglePlantDetails = async link => {
  const res = await axios.get(link, {
    params: {
      token: apiKey
    }
  })
  return res.data
}

const filterPlantProps = plant => {
  plant = plant.main_species
  const filteredPlant = {
    scientific_name: plant.scientific_name,
    family_common_name: plant.family_common_name,
    common_name: plant.common_name,
    specifications_growth_habitat: plant.specifications.growth_habitat,
    specifications_mature_height: plant.specifications.mature_height,
    seed_commercial_availability: plant.seed.commercial_availability,
    growth_moisture_use: plant.growth.moisture_use,
    growth_drought_tolerance: plant.growth.drought_tolerance,
    flower_color: plant.flower.flower_color,
    flower_conspicuous: plant.flower.conspicuous,
    foliage_texture: plant.foliage.texture,
    images: plant.images
  }

  return filteredPlant
}

const fetchAllPlantDetails = async () => {
  const plantOverviews = await fetchAllPlants()
  const plantDetail = []

  for (let i = 0; i < plantOverviews.length; i++) {
    const plantInfo = await fetchSinglePlantDetails(plantOverviews[i].link)
    if (i % 30 === 0 && i > 0) console.log(`Processed ${i} plants`)
    plantDetail.push(filterPlantProps(plantInfo))
  }

  return plantDetail
}

function savePlants(data) {
  const contents = JSON.stringify(data, null, 2)
  const filePath = path.join(__dirname, 'seed-data.json')
  fs.writeFile(filePath, contents, 'utf8', function(err) {
    if (err) console.log(err)
    else console.log('The data from Trefle API was saved!')
  })
}

const runData = async () => {
  savePlants(await fetchAllPlantDetails())
}

runData()
