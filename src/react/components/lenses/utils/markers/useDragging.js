import { useEffect } from 'react'

export const useDragging = (mapRef, enableDragging, onDragEnd) => {
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.eachLayer((marker) => {
        if (marker.dioryId) {
          if (enableDragging) {
            marker.dragging.enable()
            marker.on('dragend', () => {
              const { lat: latitude, lng: longitude } = marker.getLatLng()
              onDragEnd({ id: marker.dioryId, latlng: `${latitude}, ${longitude}` })
            })
          } else {
            marker.dragging.disable()
            marker.off('dragend')
          }
        }
      })
    }
  }, [mapRef, enableDragging, onDragEnd])
}
