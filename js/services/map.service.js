import { storageService } from './storage.service.js'
import { utils } from './utils.service.js'

export const mapService = {
  initMap,
  addMarker,
  panTo,
  getCurrPos,
}

var gMap
var savedMarkers
var gCurrPos = {
  lat: 0,
  lng: 0,
  name: '',
}

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap')
  return _connectGoogleApi().then(() => {
    console.log('google available')
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    })
    console.log('Map!', gMap)

    google.maps.event.addListener(gMap, 'click', (event) => {
      setMarkerPos(event.latLng, gMap)
    })
  })
}

function setMarkerPos(pos, map) {
  var marker = new google.maps.Marker({
    position: pos,
    map: map,
    name: prompt('Enter place name'),
  })
  gCurrPos.lat = marker.getPosition().lat()
  gCurrPos.lng = marker.getPosition().lng()
  gCurrPos.name = marker.name
}

function getCurrPos() {
  return gCurrPos
}

function addMarker() {
  var marker = new google.maps.Marker({
    position: gCurrPos,
    map: gMap,
    title: gCurrPos.name,
    id: utils.makeId(),
    createAt: new Date(),
    updateAt: updateDate(),
  })
  console.log(marker.position)

  return marker
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  const API_KEY = 'AIzaSyDY7BmM6eVXA7vWgfGy_NDXxWcxdm_XPUg'
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}

function updateDate() {
  // updateDate
}
