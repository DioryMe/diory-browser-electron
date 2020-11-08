import { useEffect } from 'react'

import { DELETE_LOCATION_BUTTON } from './buttons'

export const useDeleteLocation = (mapRef, diory, activeButton, actions) => {
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.eachLayer((marker) => {
        if (marker.dioryId) {
          if (DELETE_LOCATION_BUTTON === activeButton) {
            marker.off('click')
            marker.on('click', () => {
              marker.remove()
              marker.dioryId === diory.id
                ? actions.deleteDiory({ id: marker.dioryId })
                : actions.deleteLink({ id: diory.id }, { id: marker.dioryId })
              actions.setInactive()
            })
          }
        }
      })
    }
  }, [mapRef, diory, activeButton, actions])
}
