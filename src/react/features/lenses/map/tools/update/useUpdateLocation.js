import { useEffect } from 'react'

import { MOVE_LOCATION_BUTTON } from './buttons'

export const useUpdateLocation = (mapRef, activeButton, actions) => {
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.eachLayer((marker) => {
        if (marker.dioryId) {
          if (MOVE_LOCATION_BUTTON === activeButton) {
            marker.dragging.enable()
            marker.on('dragend', () => {
              const { lat: latitude, lng: longitude } = marker.getLatLng()
              actions.updateDiory({ id: marker.dioryId, latitude, longitude })
            })
          } else {
            marker.dragging.disable()
            marker.off('dragend')
          }
        }
      })
    }
  }, [mapRef, activeButton, actions])
}
