import { useEffect } from 'react'

export const useSetFocus = (mapRef, focus, activeButton, actions) => {
  useEffect(() => {
    mapRef.current.eachLayer((marker) => {
      if (!activeButton && marker.markerId) {
        marker.off('click')
        marker.on('click', () => {
          if (marker.isPopupOpen() && marker.markerId !== focus) {
            actions.setFocus({ focus: marker.markerId })
          } else {
            marker.togglePopup()
          }
        })
      }
    })
  }, [mapRef, focus, activeButton, actions])
}
