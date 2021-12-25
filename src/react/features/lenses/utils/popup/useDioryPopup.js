import { useEffect } from 'react'
import { useSelector } from '../../../../store'
import { createDioryPopup } from './createDioryPopup'

export const useDioryPopup = (markerRef, diory) => {
  const { dioryFolderLocation } = useSelector((state) => state.settings)

  useEffect(() => {
    if (markerRef && markerRef.current) {
      const popup = createDioryPopup({ diory }, dioryFolderLocation)
      markerRef.current
        .bindPopup(popup, {
          maxWidth: 600,
          autoPan: false,
        })
        .openPopup()
    }
  }, [markerRef, diory, dioryFolderLocation])
}
