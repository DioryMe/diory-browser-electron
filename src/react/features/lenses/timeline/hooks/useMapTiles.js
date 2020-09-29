import { useEffect } from 'react'
import L from 'leaflet'

L.TileLayer.Images = L.TileLayer.extend({
  options: {
    images: [],
  },

  initialize(options) {
    L.setOptions(this, options)
  },

  getTileUrl() {
    const i = Math.ceil(Math.random() * (this.options.images.length - 1))
    return this.options.images[i]
  },
})

L.tileLayer.images = function (options) {
  return new L.TileLayer.Images(options)
}

export const useMapTiles = (mapRef, diorys) => {
  const images = diorys.map(({ image }) => image).filter(Boolean)
  useEffect(() => {
    if (mapRef.current) {
      L.tileLayer.images({ images }).addTo(mapRef.current)
    }
  }, [mapRef, images])
}
