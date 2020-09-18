import { useEffect } from 'react'
import * as buttons from '../buttons'

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

export const useAddLocation = (mapRef, focus, activeButton, actions) => {
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
        actions.createDiory({ id, image, latitude: lat, longitude: lng })
        actions.createLink({ id: focus }, { id })
        actions.setFocus({ focus: id })
        actions.setActive(UPDATE_TOOL_BUTTON)
      })
    }
  }, [mapRef, activeButton, focus, actions])
}
