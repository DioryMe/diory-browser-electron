import { useEffect } from 'react'

export const useTogglePopup = (mapRef, diory, activeButton) => {
  useEffect(() => {
    mapRef.current.eachLayer((marker) => {
      if (marker.dioryId) {
        marker.on('click', () => {
          marker.togglePopup()
        })
      }
    })
  }, [mapRef, diory, activeButton])
}
