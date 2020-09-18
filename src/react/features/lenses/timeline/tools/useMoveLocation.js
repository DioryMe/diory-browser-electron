import { useEffect } from 'react'

import * as buttons from '../buttons'

export const useMoveLocation = (mapRef, activeButton, actions) => {
  useEffect(() => {
    mapRef.current.eachLayer((marker) => {
      if (marker.markerId) {
        if (buttons.MAP_MOVE_LOCATION === activeButton) {
          marker.dragging.enable()
          marker.on('dragend', () => {
            const { lat: latitude, lng: longitude } = marker.getLatLng()
            actions.updateDiory({ id: marker.markerId, latitude, longitude })
          })
        } else {
          marker.dragging.disable()
          marker.off('dragend')
        }
      }
    })
  }, [mapRef, activeButton, actions])
}
