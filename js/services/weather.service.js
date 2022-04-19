import { mapService } from './services/map.service.js'

const WEATHER_KEY = '2548ced2324f1cd8d559b99e4beebce5'
const lat = mapService.getCurrPos.lat
const lng = mapService.getCurrPos.lng
const API =
  '{"coord":{"lon":34.909,"lat":32.0761},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02n"}],"base":"stations","main":{"temp":291.41,"feels_like":291.33,"temp_min":290.4,"temp_max":292.55,"pressure":1015,"humidity":78},"visibility":10000,"wind":{"speed":3.09,"deg":350},"clouds":{"all":20},"dt":1650390943,"sys":{"type":1,"id":6845,"country":"IL","sunrise":1650337619,"sunset":1650384700},"timezone":10800,"id":294904,"name":"Central District","cod":200}'
let gCurrWeather = {}
console.log(lat, lng)

fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_KEY}`
)
  .then((response) => response.json())
  .then((data) => {})
  .catch((error) => console.log(error))

console.log(API.json())
