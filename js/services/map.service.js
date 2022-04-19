import { storageService } from './storage.service.js'
import { utils } from './utils.service.js'

export const mapService = {
  initMap,
  addMarker,
  panTo,
  getCurrMarker,
  getSavedMarkers,
}

var gMap
var gSavedMarkers = []
var gCurrMarker = {
  lat: 0,
  lng: 0,
  name: '',
  id: 0,
  createAt: null,
  updateAt: null,
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
    id: utils.makeId(),
    createAt: new Date(),
    updateAt: updateDate(),
  })
  gCurrMarker.lat = marker.getPosition().lat()
  gCurrMarker.lng = marker.getPosition().lng()
  gCurrMarker.name = marker.name
  gCurrMarker.id = marker.id
  gCurrMarker.createAt = marker.createAt
  gCurrMarker.updateAt = marker.updateAt
}

function getCurrMarker() {
  return gCurrMarker
}

function getSavedMarkers() {
  const markers = storageService.load('markesDB')
  return markers
}

function addMarker() {
  gSavedMarkers.push(gCurrMarker)
  storageService.save('markesDB', gSavedMarkers)
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
  return new Date()
}
