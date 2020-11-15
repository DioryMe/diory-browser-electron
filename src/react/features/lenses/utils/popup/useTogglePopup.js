import { useEffect } from 'react'

export const useTogglePopup = (mapRef, diory) => {
  useEffect(() => {
    mapRef.current.eachLayer((marker) => {
      if (marker.dioryId) {
        marker.off('click')
        marker.on('click', () => {
          marker.togglePopup()
        })
      }
    })
  }, [mapRef, diory])
}
