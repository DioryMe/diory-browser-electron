import { useEffect } from 'react'
import { useCompare } from '../../../../utils/useCompare'
import { getLocationData } from './getLocationData'

const MAX_ZOOM = 14

// TODO: Use store for map data
let initialBounds = true
const useInitialMapBounds = (mapRef, diory, diorys) => {

  if (!mapRef.current) {
    initialBounds = true
  }
  useEffect(() => {
    if (initialBounds) {
      if (mapRef.current) {
        const { center, min, max } = getLocationData({ diory, diorys })
        if (min && max) {
          mapRef.current.fitBounds([min, max])
        } else if (center) {
          mapRef.current.setView(center, MAX_ZOOM)
        } else {
          mapRef.current.fitWorld()
        }
        initialBounds = false
      }
    }
  }, [mapRef, diory, diorys])
}

export const useMapBounds = (mapRef, diory, diorys) => {
  useInitialMapBounds(mapRef, diory, diorys)

  const focusChanged = useCompare(diory.id)
  useEffect(() => {
    if (mapRef.current && focusChanged) {
      const { center, min, max } = getLocationData({ diory, diorys })
      if (min && max) {
        mapRef.current.flyToBounds([min, max], { maxZoom: MAX_ZOOM })
      } else if (center) {
        mapRef.current.flyTo(center, MAX_ZOOM)
      } else {
        mapRef.current.fitWorld()
      }
    }
  }, [mapRef, focusChanged, diory, diorys])
}
