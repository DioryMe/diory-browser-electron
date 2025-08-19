import { useEffect, useRef } from 'react'
import L from 'leaflet'

const getIcon = ({ selected }) =>
  new L.Icon({
    iconUrl: selected
      ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
      : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
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

const getKeys = (array) => array.map(({ diory }) => diory.key)

export const useLinkMarkers = (mapRef, markerLocations) => {
  const markerRefs = useRef([])
  useEffect(() => {
    if (mapRef.current) {
      markerRefs.current
        .filter(({ diory }) => !getKeys(markerLocations).includes(diory.key))
        .map((marker) => marker.remove())

      const oldMarkers = markerRefs.current.filter(({ diory }) =>
        getKeys(markerLocations).includes(diory.key)
      )

      const newMarkers = markerLocations
        .filter(({ diory }) => !getKeys(markerRefs.current).includes(diory.key))
        .map(({ diory, center }) => {
          const icon = getIcon(diory)
          const marker = L.marker(center, { icon }).addTo(mapRef.current)
          marker.diory = diory
          return marker
        })
        .map(addDataTestIdToMarker('linked-diory-marker'))

      markerRefs.current = oldMarkers.concat(newMarkers)
    }
  }, [mapRef, markerRefs, markerLocations])

  return markerRefs
}
