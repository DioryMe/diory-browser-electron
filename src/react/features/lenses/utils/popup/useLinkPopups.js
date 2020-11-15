import { useEffect } from 'react'
import { createDioryPopup } from './createDioryPopup'

export const useLinkPopups = (markerRefs, diorys) => {
  useEffect(() => {
    if (markerRefs.current) {
      markerRefs.current
        .filter((marker) => !marker.getPopup())
        .forEach((marker) => {
          const diory = diorys.find(({ id }) => id === marker.dioryId)
          const popup = createDioryPopup({ diory })
          marker.bindPopup(popup, {
            maxWidth: 600,
            autoPan: true,
          })
        })
    }
  }, [markerRefs, diorys])
}
