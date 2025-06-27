import { useEffect, useRef } from 'react'
import L from 'leaflet'

const icon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [30, 51],
  iconAnchor: [12, 51],
  popupAnchor: [6, -44],
  shadowSize: [51, 51],
})

const addDataTestIdToMarker = (id) => (marker) => {
  marker._icon.setAttribute('data-testid', id)
  return marker
}

export const useDioryMarker = (mapRef, locationData) => {
  const { diory, center } = locationData || {}
  const markerRef = useRef(null)

  useEffect(() => {
    if (!markerRef.current && center) {
      const marker = L.marker(center, { icon })
      marker.diory = diory

      if (marker) {
        markerRef.current = addDataTestIdToMarker('diory-marker')(marker.addTo(mapRef.current))
      }
    }
    if (markerRef.current && center) {
      markerRef.current.setLatLng(center).setOpacity(1)
    }
    if (markerRef.current && !center) {
      markerRef.current.setOpacity(0)
    }
  }, [mapRef, diory, center])

  return markerRef
}
