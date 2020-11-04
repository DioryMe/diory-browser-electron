import { useEffect } from 'react'
import { useDispatch, useStore } from '../../../../store'

export const useTogglePopup = (mapRef) => {
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ active }] = useStore((state) => state.buttons)
  const dispatch = useDispatch()
  useEffect(() => {
    mapRef.current.eachLayer((marker) => {
      if (marker.dioryId) {
        marker.on('click', () => {
          marker.togglePopup()
        })
      }
    })
  }, [mapRef, focus, active, dispatch])
}
