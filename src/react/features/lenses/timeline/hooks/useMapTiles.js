import { useEffect, useRef } from 'react'
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
  const layerRef = useRef()
  useEffect(() => {
    if (mapRef.current && images.length) {
      if (layerRef.current) {
        layerRef.current.remove()
      }
      layerRef.current = L.tileLayer
        .images({
          images,
          opacity: 0.3,
        })
        .addTo(mapRef.current)
    }
  }, [mapRef, layerRef, images])
}
