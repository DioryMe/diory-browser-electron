import { useEffect } from 'react'

export const useMarkerClick = (mapRef, diory, onMarkerClick) => {
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.eachLayer((marker) => {
        if (marker.dioryId) {
          marker.on('click', () => {
            onMarkerClick({ id: marker.dioryId })
          })
        }
      })
    }
  }, [mapRef, diory, onMarkerClick])
}
