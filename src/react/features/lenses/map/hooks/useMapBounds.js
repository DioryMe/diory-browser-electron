import { useCallback, useEffect, useState } from 'react'
import { useCompare, useInitial } from '../../../../utils/useCompare'

import { useMapZoom } from './useMapZoom'

const MAX_ZOOM = 14

const useFitToBounds = (mapRef, { center, min, max }, bounds) => {
  const isInitial = useInitial(center)
  useEffect(() => {
    if (mapRef.current) {
      if (bounds) {
        isInitial
          ? mapRef.current.fitBounds(bounds, { maxZoom: MAX_ZOOM })
          : mapRef.current.flyToBounds(bounds, { maxZoom: MAX_ZOOM })
      } else if (min && max) {
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
  }, [mapRef, isInitial, bounds, center, min, max])
}

export const useMapBounds = (mapRef, dioryLocationData, onBoundsChange) => {
  const [bounds, setBounds] = useState()

  const locationDataChanged = useCompare(dioryLocationData.id)
  useEffect(() => {
    if (locationDataChanged) {
      setBounds(undefined)
    }
  }, [locationDataChanged])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleBounds = useCallback((bounds) => {
    onBoundsChange(bounds)
    setBounds(bounds)
  })

  useFitToBounds(mapRef, dioryLocationData, bounds)
  useMapZoom(mapRef, handleBounds)
}
