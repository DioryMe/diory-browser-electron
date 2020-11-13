import { useEffect } from 'react'
import { useCompare, useInitial } from '../../../../utils/useCompare'
import { getLocationData } from './getLocationData'

const MAX_ZOOM = 14

export const useMapBounds = (mapRef, diory, diorys) => {
  const isInitial = useInitial(diory.id)
  const focusChanged = useCompare(diory.id)
  useEffect(() => {
    if (focusChanged) {
      const { center, min, max } = getLocationData({ diory, diorys })
      if (min && max) {
        isInitial ?
          mapRef.current.fitBounds([min, max], { maxZoom: MAX_ZOOM }) :
          mapRef.current.flyToBounds([min, max], { maxZoom: MAX_ZOOM })
      } else if (center) {
        isInitial ?
          mapRef.current.setView(center, MAX_ZOOM) :
          mapRef.current.flyTo(center, MAX_ZOOM)
      } else {
        mapRef.current.fitWorld()
      }
    }
  }, [mapRef, focusChanged, isInitial, diory, diorys])
}
