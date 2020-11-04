import { useEffect } from 'react'
import { useDispatch } from '../../../../store'

export const useTogglePopup = (mapRef, activeButton) => {
  const dispatch = useDispatch()
  useEffect(() => {
    mapRef.current.eachLayer((marker) => {
      if (marker.dioryId) {
        marker.on('click', () => {
          marker.togglePopup()
        })
      }
    })
  }, [mapRef, activeButton, dispatch])
}
