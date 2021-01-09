import { useCallback, useEffect, useState } from 'react'
import { useCompare, useInitial } from '../../../../utils/useCompare'

const MAX_ZOOM = 14

const useFitMapToBounds = (mapRef, { center, min, max }, bounds) => {
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

function getBoundsArrays(bounds) {
  return [
    [bounds.getNorth(), bounds.getEast()],
    [bounds.getSouth(), bounds.getWest()],
  ]
}

const useGetMapBounds = (mapRef, onBoundsChange) => {
  useEffect(() => {
    if (mapRef.current) {
      const currentBounds = mapRef.current.getBounds()
      mapRef.current.off('moveend')
      mapRef.current.on('moveend', (event) => {
        const { target } = event
        const newBounds = target.getBounds()
        if (!newBounds.equals(currentBounds)) {
          onBoundsChange(getBoundsArrays(newBounds))
        }
      })
    }
  }, [mapRef, onBoundsChange])
}

export const useMapBounds = (mapRef, dioryLocationData, onBoundsChange) => {
  const [bounds, setBounds] = useState()

  const locationDataChanged = useCompare(dioryLocationData.id)
  useEffect(() => {
    if (locationDataChanged) {
      setBounds(undefined)
    }
  }, [locationDataChanged])

  useFitMapToBounds(mapRef, dioryLocationData, bounds)

  const handleBounds = useCallback((bounds) => {
    onBoundsChange(bounds)
    setBounds(bounds)
  })
  useGetMapBounds(mapRef, handleBounds)
}
