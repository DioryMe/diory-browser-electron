import { useEffect } from 'react'
import { useDispatch } from '../../../../store'
import { setFocus } from '../../../navigation/actions'
import { createDiory, createLink } from '../../../room/actions'
import { setActive } from '../../../buttons/actions'
import * as buttons from './buttons'

import { UPDATE_TOOL_BUTTON } from '../../../tools/update/buttons'

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

export const useAddLocation = (mapRef, diory, activeButton) => {
  const dispatch = useDispatch()
  useEffect(() => {
    mapRef.current.off('click')

    if (buttons.MAP_ADD_LOCATION === activeButton) {
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
        dispatch(createLink({ id: diory.id }, { id }))
        dispatch(setFocus({ focus: id }))
        dispatch(setActive(UPDATE_TOOL_BUTTON))
      })
    }
  }, [mapRef, activeButton, diory, dispatch])
}
