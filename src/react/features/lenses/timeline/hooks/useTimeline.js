import { useEffect, useRef } from 'react'
import L from 'leaflet'

export const useTimeline = (id) => {
  const mapRef = useRef(null)
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map(id, {
        zoomControl: false,
      })
      L.control
        .zoom({
          position: 'topright',
        })
        .addTo(mapRef.current)
    }

    return () => {
      mapRef.current.off()
      mapRef.current.remove()
    }
  }, [id, mapRef])
  return mapRef
}
