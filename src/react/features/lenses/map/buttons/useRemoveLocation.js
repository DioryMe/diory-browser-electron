import { useEffect } from 'react'
import { useDispatch } from '../../../../store'
import { deleteDiory, deleteLink } from '../../../room/actions'
import * as buttons from './buttons'

export const useRemoveLocation = (mapRef, diory, activeButton) => {
  const dispatch = useDispatch()
  useEffect(() => {
    mapRef.current.eachLayer((marker) => {
      if (marker.dioryId) {
        if (buttons.MAP_REMOVE_LOCATION === activeButton) {
          marker.off('click')
          marker.on('click', () => {
            marker.remove()
            marker.dioryId === diory.id
              ? dispatch(deleteDiory({ id: marker.dioryId }))
              : dispatch(deleteLink({ id: diory.id }, { id: marker.dioryId }))
          })
        }
      }
    })
  }, [mapRef, diory, activeButton, dispatch])
}
