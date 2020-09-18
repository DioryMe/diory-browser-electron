import { useEffect } from 'react'

export const useTogglePopup = (mapRef, focus, activeButton) => {
  useEffect(() => {
    mapRef.current.eachLayer((marker) => {
      if (marker.markerId && !marker.isPopupOpen()) {
        console.log('togglePopup')
        marker.on('click', () => {
          marker.togglePopup()
        })
      }
    })
  }, [mapRef, focus, activeButton])
}
