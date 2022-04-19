const WEATHER_KEY = '2548ced2324f1cd8d559b99e4beebce5'
const lat = 32.0749831
const lon = 32.0749831

fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}`
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error))
