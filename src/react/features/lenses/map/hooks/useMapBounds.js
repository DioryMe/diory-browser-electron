import { useEffect } from 'react'
import { useInitial } from '../../../../utils/useCompare'

const MAX_ZOOM = 14

export const useMapBounds = (mapRef, { center, min, max }) => {
  const isInitial = useInitial(center)
  useEffect(() => {
    if (mapRef.current) {
      if (min && max) {
        isInitial
          ? mapRef.current.fitBounds([min, max], { maxZoom: MAX_ZOOM })
          : mapRef.current.flyToBounds([min, max], { maxZoom: MAX_ZOOM })
      } else if (center) {
        isInitial
          ? mapRef.current.setView(center, MAX_ZOOM)
          : mapRef.current.flyTo(center, MAX_ZOOM)
      } else {
        mapRef.current.fitWorld()
      }
    }
  }, [mapRef, isInitial, center, min, max])
}
