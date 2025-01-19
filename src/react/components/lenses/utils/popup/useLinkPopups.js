import { useEffect } from 'react'
import { createDioryPopup } from './createDioryPopup'

export const useLinkPopups = (markerRefs, memories) => {
  useEffect(() => {
    if (markerRefs.current) {
      markerRefs.current
        .filter((marker) => !marker.getPopup())
        .forEach((marker) => {
          const diory = memories.find(({ id }) => id === marker.dioryId)
          const popup = createDioryPopup({ diory })
          marker.bindPopup(popup, {
            maxWidth: 600,
            autoPan: false,
          })
        })
    }
  }, [markerRefs, memories])
}
