import { useEffect } from 'react'
import { useInitial } from '../../../../utils/useCompare'

const MAX_ZOOM = 14

const useFitMapToBounds = (mapRef, { center, min, max }, fitToBounds) => {
  const isInitial = useInitial(center)
  useEffect(() => {
    if (mapRef.current && isInitial) {
      if (min && max) {
        mapRef.current.fitBounds([min, max], { maxZoom: MAX_ZOOM })
      } else if (center) {
        mapRef.current.setView(center, MAX_ZOOM)
      } else {
        mapRef.current.fitWorld()
      }
    } else if (mapRef.current && fitToBounds) {
      if (min && max) {
        mapRef.current.flyToBounds([min, max], { maxZoom: MAX_ZOOM })
      } else if (center) {
        mapRef.current.flyTo(center, MAX_ZOOM)
      } else {
        mapRef.current.fitWorld()
      }
    }
  }, [mapRef, fitToBounds, isInitial, center, min, max])
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
      if (onBoundsChange) {
        onBoundsChange(getBoundsArrays(currentBounds))
      }
      mapRef.current.off('moveend')
      mapRef.current.on('moveend', (event) => {
        const { target } = event
        const newBounds = target.getBounds()
        if (!newBounds.equals(currentBounds)) {
          if (onBoundsChange) {
            onBoundsChange(getBoundsArrays(currentBounds))
          }
        }
      })
    }
  }, [mapRef, onBoundsChange])
}

export const useMapBounds = (mapRef, dioryLocationData, fitToBounds, onBoundsChange) => {
  useFitMapToBounds(mapRef, dioryLocationData, fitToBounds)
  useGetMapBounds(mapRef, onBoundsChange)
}
