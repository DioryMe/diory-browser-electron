import { useEffect } from 'react'
import { useStore } from '../../../../store'
import { createDioryPopup } from './createDioryPopup'

export const useDioryPopup = (markerRef, diory) => {
  const [{ dioryLocation }] = useStore((state) => state.settings)

  useEffect(() => {
    if (markerRef && markerRef.current) {
      const popup = createDioryPopup({ diory }, dioryLocation)
      markerRef.current
        .bindPopup(popup, {
          maxWidth: 600,
          autoPan: false,
        })
        .openPopup()
    }
  }, [markerRef, diory, dioryLocation])
}
