import { useEffect, useRef } from 'react'
import L from 'leaflet'

const addDataTestIdToMarker = (id) => (marker) => {
  marker._icon.setAttribute('data-testid', id)
  return marker
}

export const useDioryMarker = (mapRef, locationData) => {
  const { address, center } = locationData || {}
  const markerRef = useRef(null)
  useEffect(() => {
    if (!markerRef.current && center) {
      const marker = L.marker(center)
      marker.address = address

      if (marker) {
        markerRef.current = addDataTestIdToMarker('diory-marker')(marker.addTo(mapRef.current))
      }
    }
    if (markerRef.current && center) {
      markerRef.current.setLatLng(center)
    }
  }, [mapRef, address, center])

  return markerRef
}
