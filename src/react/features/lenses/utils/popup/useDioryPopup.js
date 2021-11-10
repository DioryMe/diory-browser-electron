import { useEffect } from 'react'
import { useStore } from '../../../../store'
import { createDioryPopup } from './createDioryPopup'

export const useDioryPopup = (markerRef, diory) => {
  const [{ folderLocation }] = useStore((state) => state.diograph)

  useEffect(() => {
    if (markerRef && markerRef.current) {
      const popup = createDioryPopup({ diory }, folderLocation)
      markerRef.current
        .bindPopup(popup, {
          maxWidth: 600,
          autoPan: false,
        })
        .openPopup()
    }
  }, [markerRef, diory, folderLocation])
}
