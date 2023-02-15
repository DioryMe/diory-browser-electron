import { useEffect } from 'react'
import { useSelector } from '../../../../store'
import { createDioryPopup } from './createDioryPopup'

export const useLinkPopups = (markerRefs, memories) => {
  const { address } = useSelector((state) => state.room)

  useEffect(() => {
    if (markerRefs.current) {
      markerRefs.current
        .filter((marker) => !marker.getPopup())
        .forEach((marker) => {
          const diory = memories.find(({ id }) => id === marker.dioryId)
          const popup = createDioryPopup({ diory }, address)
          marker.bindPopup(popup, {
            maxWidth: 600,
            autoPan: false,
          })
        })
    }
  }, [markerRefs, memories, address])
}
