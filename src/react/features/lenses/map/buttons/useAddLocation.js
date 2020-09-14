import { useEffect } from 'react'
import { useDispatch, useStore } from '../../../../store'
import { setFocus } from '../../../navigation/actions'
import { createDiory, createLink } from '../../../room/actions'
import { setActive } from '../../../buttons/actions'
import * as buttons from './buttons'

import { UPDATE_TOOL_BUTTON } from '../../grid/buttons'

const getTileURL = ({ lat, lng, zoom }) => {
  const latRad = (lat * Math.PI) / 180
  const xtile = parseInt(Math.floor(((lng + 180) / 360) * (1 << zoom)))
  const ytile = parseInt(
    Math.floor(
      ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * (1 << zoom)
    )
  )
  return `${zoom}/${xtile}/${ytile}`
}

export const useAddLocation = (mapRef) => {
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ active }] = useStore((state) => state.buttons)
  const dispatch = useDispatch()
  useEffect(() => {
    mapRef.current.off('click')

    if (buttons.MAP_ADD_LOCATION === active) {
      mapRef.current.on('click', ({ latlng }) => {
        const { lat, lng } = latlng
        const id = new Date().toISOString()
        const zoom = mapRef.current.getZoom()
        const image = `http://a.tile.osm.org/${getTileURL({
          lat,
          lng,
          zoom,
        })}.png`
        dispatch(createDiory({ id, image, latitude: lat, longitude: lng }))
        dispatch(createLink({ id: focus }, { id }))
        dispatch(setFocus({ focus: id }))
        dispatch(setActive(UPDATE_TOOL_BUTTON))
      })
    }
  }, [mapRef, active, focus, dispatch])
}
