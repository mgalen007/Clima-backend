export default class HomeData {
    constructor(rawData) {
        this.currentTemp = rawData.main.temp 
        this.condition = rawData.weather[0].description
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