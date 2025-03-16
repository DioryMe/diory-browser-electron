import { useEffect, useRef } from 'react'
import L from 'leaflet'

const addDataTestIdToMarker = (id) => (marker) => {
  marker._icon.setAttribute('data-testid', id)
  return marker
}

const getAddresses = (array) => array.map(({ address }) => address)

export const useLinkMarkers = (mapRef, markerLocations) => {
  const markerRefs = useRef([])
  useEffect(() => {
    if (mapRef.current) {
      markerRefs.current
        .filter(({ address }) => !getAddresses(markerLocations).includes(address))
        .map((marker) => marker.remove())

      const oldMarkers = markerRefs.current.filter(({ address }) =>
        getAddresses(markerLocations).includes(address)
      )

      const newMarkers = markerLocations
        .filter(({ address }) => !getAddresses(markerRefs.current).includes(address))
        .map(({ address, center }) => {
          const marker = L.marker(center).addTo(mapRef.current)
          marker.address = address
          return marker
        })
        .map(addDataTestIdToMarker('linked-diory-marker'))

      markerRefs.current = oldMarkers.concat(newMarkers)
    }
  }, [mapRef, markerRefs, markerLocations])

  return markerRefs
}
