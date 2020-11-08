import { useEffect } from 'react'

export const useSetFocus = (mapRef, diory, activeButton, { setFocus }) => {
  useEffect(() => {
    mapRef.current.eachLayer((marker) => {
      if (marker.dioryId) {
        if (!activeButton) {
          marker.off('click')
          if (marker.dioryId !== diory.id) {
            marker.on('click', () => {
              if (marker.isPopupOpen()) {
                setFocus({ focus: marker.dioryId })
              }
            })
          }
        }
      }
    })
  }, [mapRef, diory, activeButton, setFocus])
}
