import { useEffect, useRef } from 'react'
import L from 'leaflet'

const addDataTestIdToMarker = (id) => (marker) => {
  marker._icon.setAttribute('data-testid', id)
  return marker
}

function getIcon(mapRef, size, color = 'blue') {
  const offset = mapRef.current._container.offsetHeight / 2 - 130

  return L.icon({
    iconAnchor: [(size - 1) * 10, -offset],
    iconRetinaUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    iconSize: [25 * size, 41 * size],
    popupAnchor: [12, offset],
    shadowSize: [41 * size, 41 * size],
    shadowUrl:
      'https://github.com/Leaflet/Leaflet/blob/master/dist/images/marker-shadow.png?raw=true',
    tooltipAnchor: [16, -28],
  })
}

export const useFocusMarker = (mapRef, { id, center }) => {
  const markerRef = useRef(null)
  useEffect(() => {
    if (center) {
      if (!markerRef.current) {
        markerRef.current = L.marker(center, {
          icon: getIcon(mapRef, 1.3, 'green'),
        }).addTo(mapRef.current)
      }
      markerRef.current.setLatLng(center)
      markerRef.current.markerId = id
    }
  }, [mapRef, id, center])

  return markerRef
}

export const useLinkMarkers = (mapRef, markerLocations) => {
  const markerRefs = useRef([])
  useEffect(() => {
    markerRefs.current
      .filter(({ markerId }) => !markerLocations.map(({ id }) => id).includes(markerId))
      .map((marker) => marker.remove())

    const oldMarkers = markerRefs.current.filter(({ markerId }) =>
      markerLocations.map(({ id }) => id).includes(markerId)
    )

    const newMarkers = markerLocations
      .filter(({ id }) => !markerRefs.current.map(({ markerId }) => markerId).includes(id))
      .map(({ id, center }) => {
        const marker = L.marker(center, {
          icon: getIcon(mapRef, 1),
        }).addTo(mapRef.current)
        marker.markerId = id
        return marker
      })
      .map(addDataTestIdToMarker('linked-diory-marker'))

    markerRefs.current = oldMarkers.concat(newMarkers)
  }, [mapRef, markerRefs, markerLocations])

  return markerRefs
}
