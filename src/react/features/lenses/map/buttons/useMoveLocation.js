import { useEffect } from 'react'
import { useDispatch, useStore } from '../../../../store'
import { updateDiory } from '../../../room/actions'
import * as buttons from './buttons'

export const useMoveLocation = (mapRef) => {
  const [{ active }] = useStore((state) => state.buttons)
  const dispatch = useDispatch()
  useEffect(() => {
    mapRef.current.eachLayer((marker) => {
      if (marker.dioryId) {
        if (buttons.MAP_MOVE_LOCATION === active) {
          marker.dragging.enable()
          marker.on('dragend', () => {
            const { lat: latitude, lng: longitude } = marker.getLatLng()
            dispatch(updateDiory({ id: marker.dioryId, latitude, longitude }))
          })
        } else {
          marker.dragging.disable()
          marker.off('dragend')
        }
      }
    })
  }, [mapRef, active, dispatch])
}
