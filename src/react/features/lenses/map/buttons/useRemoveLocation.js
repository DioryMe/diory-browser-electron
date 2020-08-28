import { useEffect } from 'react'
import { useDispatch, useStore } from '../../../../store'
import { deleteDiory, deleteLink } from '../../../room/actions'
import * as buttons from './buttons'

export const useRemoveLocation = (mapRef) => {
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ active }] = useStore((state) => state.tools)
  const dispatch = useDispatch()
  useEffect(() => {
    mapRef.current.eachLayer((marker) => {
      if (marker.dioryId) {
        if (buttons.MAP_REMOVE_LOCATION === active) {
          marker.off('click')
          marker.on('click', () => {
            marker.remove()
            marker.dioryId === focus
              ? dispatch(deleteDiory({ id: marker.dioryId }))
              : dispatch(deleteLink({ id: focus }, { id: marker.dioryId }))
          })
        }
      }
    })
  }, [mapRef, focus, active, dispatch])
}
