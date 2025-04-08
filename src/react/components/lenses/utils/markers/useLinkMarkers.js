import { useEffect, useRef } from 'react'
import L from 'leaflet'

const icon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const addDataTestIdToMarker = (id) => (marker) => {
  marker._icon.setAttribute('data-testid', id)
  return marker
}

const getKeys = (array) => array.map(({ key }) => key)

export const useLinkMarkers = (mapRef, markerLocations) => {
  const markerRefs = useRef([])
  useEffect(() => {
    if (mapRef.current) {
      markerRefs.current
        .filter(({ key }) => !getKeys(markerLocations).includes(key))
        .map((marker) => marker.remove())

      const oldMarkers = markerRefs.current.filter(({ key }) =>
        getKeys(markerLocations).includes(key)
      )

      const newMarkers = markerLocations
        .filter(({ key }) => !getKeys(markerRefs.current).includes(key))
        .map(({ key, center }) => {
          const marker = L.marker(center, { icon }).addTo(mapRef.current)
          marker.key = key
          return marker
        })
        .map(addDataTestIdToMarker('linked-diory-marker'))

      markerRefs.current = oldMarkers.concat(newMarkers)
    }
  }, [mapRef, markerRefs, markerLocations])

  return markerRefs
}
