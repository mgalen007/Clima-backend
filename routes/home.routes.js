import express from 'express'
import 'dotenv/config'
import HomeData from '../schemas/home-schema.js'

const homeRouter = express.Router()
const API_KEY = process.env.OPENWEATHERMAP_API_KEY


async function nameToCoords(cityName) {
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
    const response = await fetch(geocodeUrl)
    const data = await response.json()

    if (data.results && data.results.length > 0) {
        const { latitude, longitude, name, country } = data.results[0]
        return { name, country, latitude, longitude }
    } else {
        throw new Error('Failed to convert')
    }
}

homeRouter.get('/:city', async (req, res) => {
    const cityName = req.params.city

    try {
        const cityDetails = await nameToCoords(cityName)
        const lat = cityDetails.latitude
        const lon = cityDetails.longitude
        const openWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        const openMeteoApi = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=uv_index&hourly=precipitation_probability&timezone=auto`

        const response = await fetch(openWeatherApi)
        if (!response.ok) {
            res.status(500).send('Error: Failed to retrieve data')
            return
        }

        const rawData = await response.json()
        const openMeteoResponse = await fetch(openMeteoApi)

        if (!openMeteoResponse.ok) {
            res.status(500).send('Error: Failed to fetch data')
            return
        }
        
        const openMeteoData = await openMeteoResponse.json()
        const uvIndex = openMeteoData.current['uv_index']
        let currentTime = openMeteoData.current.time
        let chanceIndex = openMeteoData.hourly.time.indexOf(currentTime)
        const rainChance = openMeteoData.hourly['precipitation_probability'][chanceIndex]
        rawData.uvIndex = uvIndex
        rawData.rainChance = rainChance
        let cleanedData = new HomeData(rawData)
        cleanedData = cleanedData.show()

        res.json(cleanedData)

    } catch(error) {
        res.status(500).send('An error occured. Please try again later')
    }
})

export default homeRouter