import { useEffect } from 'react'
import { useSelector } from '../../../../store'
import { createDioryPopup } from './createDioryPopup'

export const useDioryPopup = (markerRef, diory) => {
  const { address } = useSelector((state) => state.diosphere)

  useEffect(() => {
    if (markerRef && markerRef.current) {
      const popup = createDioryPopup({ diory }, address)
      markerRef.current
        .bindPopup(popup, {
          maxWidth: 600,
          autoPan: false,
        })
        .openPopup()
    }
  }, [markerRef, diory, address])
}
