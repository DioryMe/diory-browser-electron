import { useEffect } from 'react'
import { useDispatch, useStore } from '../../../../store'
import { setFocus } from '../../../navigation/actions'

export const useSetFocus = (mapRef) => {
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ active }] = useStore((state) => state.buttons)
  const dispatch = useDispatch()
  useEffect(() => {
    mapRef.current.eachLayer((marker) => {
      if (marker.dioryId) {
        if (!active) {
          marker.off('click')
          if (marker.dioryId !== focus) {
            marker.on('click', () => {
              if (marker.isPopupOpen()) {
                dispatch(setFocus({ focus: marker.dioryId }))
              }
            })
          }
        }
      }
    })
  }, [mapRef, focus, active, dispatch])
}
