import { useEffect, useRef } from 'react'
import L from 'leaflet'

export const useMap = (id) => {
  const mapRef = useRef(null)
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map(id, {
        layers: [
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          }),
        ],
      })
    }

    return () => {
      mapRef.current.off()
      mapRef.current.remove()
    }
  }, [id, mapRef])
  return mapRef
}
