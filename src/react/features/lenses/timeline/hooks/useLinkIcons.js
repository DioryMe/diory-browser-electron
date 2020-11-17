import { useEffect } from 'react'
import L from 'leaflet'

function getIcon(mapRef, size, color = 'blue') {
  const offset = mapRef.current._container.offsetHeight / 2 - 175

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

export const useLinkIcons = (mapRef, markerRefs, diory) => {
  useEffect(() => {
    if (markerRefs.current) {
      markerRefs.current.forEach((marker) => {
        marker.setIcon(getIcon(mapRef, 1))
      })
    }
  }, [mapRef, markerRefs, diory])
}
