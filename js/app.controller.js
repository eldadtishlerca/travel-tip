import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onDeleteMark = onDeleteMark

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready')
    })
    .catch(() => console.log('Error: cannot init map'))

  mapService.getSavedMarkers()
  renderMarkerLocations()
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos')
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker() {
  console.log(mapService.getCurrMarker())
  console.log('Adding a marker')
  mapService.addMarker()
  renderMarkerLocations()
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    console.log('Locations:', locs)
    document.querySelector('.locs').innerText = JSON.stringify(locs)
  })
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log('User position is:', pos.coords)
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch((err) => {
      console.log('err!!!', err)
    })
}
function onPanTo() {
  console.log('Panning the Map')
  mapService.panTo(35.6895, 139.6917)
}

function renderMarkerLocations() {
  const elLocationBox = document.querySelector('.location-table')
  const markers = mapService.getSavedMarkers()
  elLocationBox.innerHTML = markers.map(
    (marker) =>
      `<div class="mark-item" id="${marker.id}">
        <h4>${marker.name}</h4>
        <div class="">
        <div>lat: ${marker.lat}, lng: ${marker.lng}</div>
        <div>
          <button class="btn-center" onclick="onCenterLocation('${marker.id}')">GO</button>
          <button class="btn-delete" onclick="onDeleteMark('${marker.id}')">X</button>
        </div>
        </div>
      </div>`
  )
}

function onDeleteMark(id) {
  mapService.deleteMark(id)
  onInit()
  renderMarkerLocations()
}
