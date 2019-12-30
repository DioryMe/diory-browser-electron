import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { useStore } from '../../../../store'
import { useFocusDiory } from '../../../room/hooks'
import { setFocus } from '../../../navigation/actions'

const useDioryLatLng = () => {
  const { diory, diorys } = useFocusDiory()
  const latitudes = diorys
    .filter(({ latitude }) => latitude)
    .map(({ latitude }) => latitude)
  const longitudes = diorys
    .filter(({ longitude }) => longitude)
    .map(({ longitude }) => longitude)
  const latitudesAndLongitudesExists = latitudes.length && longitudes.length
  return {
    center: diory.latitude && diory.longitude && {
      lat: diory.latitude,
      lng: diory.longitude,
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

const useDioryPopup = markerRef => {
  const { diory } = useFocusDiory()

  const popupRef = useRef(null)
  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.setContent(getDioryPopup(diory))
    } else {
      popupRef.current = L.popup({
        closeButton: false,
      }).setContent(getDioryPopup(diory))
    }
  }, [diory])

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current
        .bindPopup(popupRef.current, {
          maxWidth: 'auto'
        })
        .openPopup()
    }
  }, [markerRef])
}

export const useDioryMarker = mapRef => {
  const { center } = useDioryLatLng()

  const markerRef = useRef(null)
  useEffect(() => {
    if (center) {
      if (markerRef.current) {
        markerRef.current
          .closePopup()
          .setLatLng(center)
          .openPopup()
      } else {
        markerRef.current = L.marker(center).addTo(mapRef.current)
      }
    }
    else {
      if (markerRef.current) {
        markerRef.current.remove()
      }
    }
  }, [mapRef, markerRef, center])

  useDioryPopup(markerRef)
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
        const popup = L.popup({
          closeButton: false,
        }).setContent(getDioryPopup(diory))

        const latLng = [diory.latitude, diory.longitude]
        const marker = L.marker(latLng)
          .addTo(mapRef.current)
          .bindPopup(popup, {
            maxWidth: 'auto'
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
