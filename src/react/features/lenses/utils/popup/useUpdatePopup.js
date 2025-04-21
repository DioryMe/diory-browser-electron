import { useEffect } from 'react'

// TODO: Find a better way to update popup width on image load
export const useUpdatePopup = (mapRef) => {
  useEffect(() => {
    if (mapRef.current) {
      document.querySelector('.leaflet-popup-pane').addEventListener(
        'load',
        (event) => {
          const { tagName } = event.target
          const popup = mapRef.current._popup

          if (tagName === 'IMG' && popup && !popup._updated) {
            popup._updated = true // Assumes only 1 image per Popup.
            popup.update()
          }
        },
        true
      ) // Capture the load event, because it does not bubble.
    }
  }, [mapRef])
}
