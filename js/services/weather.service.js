export const weatherService = { initWeather, getCurrWeather }
import { mapService } from './map.service.js'

const WEATHER_KEY = '2548ced2324f1cd8d559b99e4beebce5'
let gCurrWeather = {}

function initWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      setCurrentWeather(data)
    })
    .catch((error) => console.log(error))
}

function setCurrentWeather(data) {
  gCurrWeather = data.weather
  console.log(gCurrWeather)
}

function getCurrWeather() {
  return gCurrWeather
}
