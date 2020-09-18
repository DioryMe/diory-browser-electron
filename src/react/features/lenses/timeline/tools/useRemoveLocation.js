import { useEffect } from 'react'
import * as buttons from '../buttons'

export const useRemoveLocation = (mapRef, focus, activeButton, actions) => {
  useEffect(() => {
    mapRef.current.eachLayer((marker) => {
      if (marker.markerId) {
        if (buttons.MAP_REMOVE_LOCATION === activeButton) {
          marker.off('click')
          marker.on('click', () => {
            marker.remove()
            marker.markerId === focus
              ? actions.deleteDiory({ id: marker.markerId })
              : actions.deleteLink({ id: focus }, { id: marker.markerId })
          })
        }
      }
    })
  }, [mapRef, focus, activeButton, actions])
}
