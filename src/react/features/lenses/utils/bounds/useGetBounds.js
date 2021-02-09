import { useEffect } from 'react'

function getBoundsArrays(bounds) {
  return [
    [bounds.getNorth(), bounds.getEast()],
    [bounds.getSouth(), bounds.getWest()],
  ]
}

export const useGetBounds = (ref, onBoundsChange) => {
  useEffect(() => {
    if (ref.current) {
      const currentBounds = ref.current.getBounds()
      if (onBoundsChange) {
        onBoundsChange(getBoundsArrays(currentBounds))
      }
      ref.current.off('moveend')
      ref.current.on('moveend', (event) => {
        const { target } = event
        const newBounds = target.getBounds()
        if (!newBounds.equals(currentBounds)) {
          if (onBoundsChange) {
            onBoundsChange(getBoundsArrays(newBounds))
          }
        }
      })
    }
  }, [ref, onBoundsChange])
}