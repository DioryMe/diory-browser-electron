import { useEffect } from 'react'

const MAX_ZOOM = 14
const DEFAULT_LOCATION = {
  lat: 68.24109668213359,
  lng: 14.93705072614885,
}

// TODO: Use store for map data
let initialBounds = true
export const useInitialMapBounds = (mapRef, { center, min, max }) => {
  if (!mapRef.current) {
    initialBounds = true
  }
  useEffect(() => {
    if (initialBounds) {
      if (mapRef.current) {
        if (min && max) {
          mapRef.current.fitBounds([min, max])
        } else if (center) {
          mapRef.current.setView(center, MAX_ZOOM)
        } else {
          mapRef.current.setView(DEFAULT_LOCATION, MAX_ZOOM)
        }
        initialBounds = false
      }
    }
  }, [mapRef, center, min, max])
}

export const useMapBounds = (mapRef, { center, min, max }) => {
  useInitialMapBounds(mapRef, { center, min, max })

  useEffect(() => {
    if (mapRef.current) {
      if (min && max) {
        mapRef.current.flyToBounds([min, max], { maxZoom: MAX_ZOOM })
      } else if (center) {
        mapRef.current.flyTo(center, MAX_ZOOM)
      } else {
        mapRef.current.flyTo(DEFAULT_LOCATION, MAX_ZOOM)
      }
    }
  }, [mapRef, center, min, max])
}