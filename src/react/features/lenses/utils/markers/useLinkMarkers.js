import { useEffect, useRef } from 'react'
import L from 'leaflet'

const addDataTestIdToMarker = (id) => (marker) => {
  marker._icon.setAttribute('data-testid', id)
  return marker
}

export const useLinkMarkers = (mapRef, markerLocations) => {
  const markerRefs = useRef([])
  useEffect(() => {
    if (mapRef.current) {
      markerRefs.current
        .filter(({ dioryId }) => !markerLocations.map(({ id }) => id).includes(dioryId))
        .map((marker) => marker.remove())

      const oldMarkers = markerRefs.current.filter(({ dioryId }) =>
        markerLocations.map(({ id }) => id).includes(dioryId)
      )

      const newMarkers = markerLocations
        .filter(({ id }) => !markerRefs.current.map(({ dioryId }) => dioryId).includes(id))
        .map(({ id, center }) => {
          const marker = L.marker(center).addTo(mapRef.current)
          marker.dioryId = id
          return marker
        })
        .map(addDataTestIdToMarker('linked-diory-marker'))

      markerRefs.current = oldMarkers.concat(newMarkers)
    }
  }, [mapRef, markerRefs, markerLocations])

  return markerRefs
}
