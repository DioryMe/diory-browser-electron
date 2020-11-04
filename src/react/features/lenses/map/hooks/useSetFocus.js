import { useEffect } from 'react'
import { useDispatch } from '../../../../store'
import { setFocus } from '../../../navigation/actions'

export const useSetFocus = (mapRef, diory, activeButton) => {
  const dispatch = useDispatch()
  useEffect(() => {
    mapRef.current.eachLayer((marker) => {
      if (marker.dioryId) {
        if (!activeButton) {
          marker.off('click')
          if (marker.dioryId !== diory.id) {
            marker.on('click', () => {
              if (marker.isPopupOpen()) {
                dispatch(setFocus({ focus: marker.dioryId }))
              }
            })
          }
        }
      }
    })
  }, [mapRef, diory, activeButton, dispatch])
}
