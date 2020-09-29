import { useEffect } from 'react'
import { getDateLongitude } from './getTimelineData'

const MAX_ZOOM = 20
const DEFAULT_LOCATION = {
  lat: 0,
  lng: getDateLongitude({ date: Date.now() }),
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
        mapRef.current.setMaxBounds([
          [0, -100000],
          [0, 100000],
        ])
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
