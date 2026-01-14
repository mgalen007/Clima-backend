/*
From OpenWeatherMap API (data = response.weather)

current-temp -> data.main.temp
condition-description -> data.weather.description
chance-of-rain
uv-index
wind-speed / wind-strength -> data.wind.speed
humidity -> data.main.humidity
visibility -> data.visibility
feels-like -> data.main.['feels_like']
pressure -> data.main.pressure
sunset -> data.sys.sunset

const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json` (Open-Meteo API)

OpenWeatherMap API = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={API key}`
*/

export default class HomeData {
    constructor(rawData) {
        this.currentTemp = rawData.main.temp 
        this.condition = rawData.weather.description
        this.windSpeed = rawData.wind.speed
        this.humidity = rawData.main.humidity
        this.visibility = rawData.visibility
        this.feelsLike = rawData.main['feels_like']
        this.pressure = rawData.main.pressure
        this.sunset = rawData.sys.sunset
        this.uvIndex = rawData.uvIndex
        this.rainChance = rawData.rainChance
    }

    show() {
        return this
    }
}