import { useEffect, useRef } from 'react'
import L from 'leaflet'

export const useMap = (id) => {
  const mapRef = useRef(null)
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map(id)
    }

    return () => {
      mapRef.current.off()
      mapRef.current.remove()
    }
  }, [id, mapRef])
  return mapRef
}
