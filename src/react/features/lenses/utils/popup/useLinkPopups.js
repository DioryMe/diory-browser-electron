import { useEffect } from 'react'
import { useSelector } from '../../../../store'
import { createDioryPopup } from './createDioryPopup'

export const useLinkPopups = (markerRefs, memories) => {
  const { dioryFolderLocation } = useSelector((state) => state.settings)

  useEffect(() => {
    if (markerRefs.current) {
      markerRefs.current
        .filter((marker) => !marker.getPopup())
        .forEach((marker) => {
          const diory = memories.find(({ id }) => id === marker.dioryId)
          const popup = createDioryPopup({ diory }, dioryFolderLocation)
          marker.bindPopup(popup, {
            maxWidth: 600,
            autoPan: false,
          })
        })
    }
  }, [markerRefs, memories, dioryFolderLocation])
}
