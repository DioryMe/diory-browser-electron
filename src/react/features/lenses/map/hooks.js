import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { useStore } from '../../../store'
import { useFocusDiory } from '../../room/hooks'
import { setFocus } from '../../navigation/actions'

const getAverage = (array = []) => array.length ? array.reduce((a,b) => a + b, 0) / array.length : undefined

const useDioryLatLng = () => {
  const { diory, diorys } = useFocusDiory()
  const latitudes = diorys
    .filter(({ latitude }) => latitude)
    .map(({ latitude }) => latitude)
  const longitudes = diorys
    .filter(({ longitude }) => longitude)
    .map(({ longitude }) => longitude)
  const latitudesAndLongitudesExists = latitudes.length > 1 && longitudes.length > 1
  const lat = diory.latitude || getAverage(latitudes)
  const lng = diory.longitude || getAverage(longitudes)
  return {
    center: lat && lng && {
      lat,
      lng,
    },
    max: latitudesAndLongitudesExists && [
      Math.max(...latitudes),
      Math.max(...longitudes),
    ],
    min: latitudesAndLongitudesExists && [
      Math.min(...latitudes),
      Math.min(...longitudes),
    ],
  }
}

// TODO: Use store for map data
let initialBounds = true
const useInitialMapBounds = mapRef => {
  const { center, min, max } = useDioryLatLng()

  if (!mapRef.current) {
    initialBounds = true
  }
  useEffect(() => {
    if (initialBounds) {
      if (mapRef.current) {
        if (min && max) {
          mapRef.current.fitBounds([min, max])
        } else if (center) {
          mapRef.current.setView(center, 15)
        } else {
          mapRef.current.fitWorld()
        }
        initialBounds = false
      }
    }
  }, [mapRef, center, min, max])
}

const useMapBounds = mapRef => {
  const { center, min, max } = useDioryLatLng()
  useEffect(() => {
    if (mapRef.current) {
      if (min && max) {
        mapRef.current.flyToBounds([min, max])
      }
      else if (center) {
        mapRef.current.flyTo(center, 15)
      }
      else {
        mapRef.current.fitWorld()
      }
    }
  }, [mapRef, center, min, max])
}

export const useMap = id => {
  const mapRef = useRef(null)
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map(id, {
        layers: [
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          }),
        ],
      })
    }
  }, [id, mapRef])

  useInitialMapBounds(mapRef)
  useMapBounds(mapRef)
  return mapRef
}

const getDioryPopup = diory => {
  const image = `<img src="${diory.image}" height="150px"/>`
  const text = `<div>${diory.text || ''}</div>`
  return `<div style="overflow: hidden">${image + text}</div>`
}

// TODO: Find a better way to update popup width on image load
const useUpdatePopup = mapRef => {
  useEffect(() => {
    document.querySelector('.leaflet-popup-pane').addEventListener('load', function(event) {
      const
        tagName = event.target.tagName,
        popup = mapRef.current._popup

      if (tagName === 'IMG' && popup && !popup._updated) {
        popup._updated = true // Assumes only 1 image per Popup.
        popup.update()
      }
    }, true) // Capture the load event, because it does not bubble.
  }, [mapRef])
}

const useDioryPopup = (markerRef, mapRef) => {
  const { diory } = useFocusDiory()

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current
        .bindPopup(getDioryPopup(diory), {
          maxWidth: 500,
        })
        .openPopup()
    }
  }, [diory, markerRef])

  useUpdatePopup(mapRef)
}

export const useDioryMarker = mapRef => {
  const { center } = useDioryLatLng()

  const markerRef = useRef(null)
  useEffect(() => {
    if (markerRef.current) {
      if (center) {
        markerRef.current
          .closePopup()
          .setLatLng(center)
      }
      else {
        markerRef.current.remove()
        markerRef.current = null
      }
    } else {
      if (center) {
        markerRef.current = L
          .marker(center)
          .addTo(mapRef.current)
      }
    }
  }, [mapRef, markerRef, center])

  useDioryPopup(markerRef, mapRef)
}

export const useDiorysMarkers = mapRef => {
  const dispatch = useStore()[1]
  const { diorys } = useFocusDiory()

  const diorysMarkers = useRef([])
  useEffect(() => {
    diorysMarkers.current.forEach(marker => marker.remove())

    diorys
      .filter(({ latitude, longitude }) => latitude && longitude)
      .forEach(diory => {
        const popup = L
          .popup({
            closeButton: false,
          })
          .setContent(getDioryPopup(diory))

        const latLng = [diory.latitude, diory.longitude]
        const marker = L.marker(latLng)
          .addTo(mapRef.current)
          .bindPopup(popup, {
            maxWidth: 500,
          })
          .on('click', () => {
            if (!popup.isOpen()) {
              dispatch(setFocus({ focus: diory.id }))
            }
          })

        diorysMarkers.current.push(marker)
      })
  }, [mapRef, diorys, dispatch])
}
