import { useEffect } from 'react'

function getBoundsArrays(bounds) {
  return [
    [
      bounds.getNorth(),
      bounds.getEast(),
    ],[
      bounds.getSouth(),
      bounds.getWest(),
    ]
  ]
}

export const useMapZoom = (mapRef, onBoundsChange) => {
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
