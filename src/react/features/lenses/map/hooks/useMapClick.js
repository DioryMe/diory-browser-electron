import { useEffect } from 'react'

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

export const useMapClick = (mapRef, onMapClick) => {
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.off('click')
      mapRef.current.on('click', ({ latlng: { lat, lng } }) => {
        const tileUrl = getTileURL({ lat, lng, zoom: mapRef.current.getZoom() })
        const image = `http://a.tile.osm.org/${tileUrl}.png`
        onMapClick({ image, latitude: lat, longitude: lng })
      })
    }
  }, [mapRef, onMapClick])
}
