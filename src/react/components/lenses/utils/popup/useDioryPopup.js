import { useEffect } from 'react'
import { createDioryPopup } from './createDioryPopup'

export const useDioryPopup = (markerRef, diory) => {
  useEffect(() => {
    if (markerRef && markerRef.current) {
      const popup = createDioryPopup({ diory })
      markerRef.current
        .bindPopup(popup, {
          maxWidth: 600,
          autoPan: false,
        })
        .openPopup()
    }
  }, [markerRef, diory])
}
