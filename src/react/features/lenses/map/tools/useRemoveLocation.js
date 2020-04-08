import { useEffect } from 'react'
import { useDispatch, useStore } from '../../../../store'
import { removeDiory, removeLink } from '../../../room/actions'
import * as buttons from './buttons'

export const useRemoveLocation = mapRef => {
  const [{ focus }] = useStore(state => state.navigation)
  const [{ active }] = useStore(state => state.tools)
  const dispatch = useDispatch()
  useEffect(() => {
    mapRef.current.eachLayer(marker => {
      if (marker.dioryId) {
        function removeMarker() {
          marker.remove()
          marker.dioryId === focus
            ? dispatch(removeDiory({ id: marker.dioryId }))
            : dispatch(removeLink({ id: focus, link: marker.dioryId }))
        }
        if (buttons.MAP_REMOVE_LOCATION === active) {
          marker.off('click')
          marker.on('click', removeMarker)
        }
      }
    })
  }, [mapRef, focus, active, dispatch])
}
