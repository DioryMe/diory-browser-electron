import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { getScaleData } from './getScaleData'

const addDataTestIdToMarker = (id) => (marker) => {
  marker._icon.setAttribute('data-testid', id)
  return marker
}

function getIcon({ type, label }) {
  switch(type) {
    case 'min':
      return {
        className: 'min-icon',
        html: '<div style="text-align: left">' + label + '</div>',
        iconAnchor: [7, -35],
        iconSize: [100, 10],
      }
    case 'max':
      return {
        className: 'max-icon',
        html: '<div style="text-align: right">' + label + '</div>',
        iconAnchor: [93, -35],
        iconSize: [100, 10],
      }
    default:
      return {
        className: 'scale-icon',
        html: '<div style="text-align: center">|</div>' + '<div  style="text-align: center">' + label + '</div>',
        iconAnchor: [6, 0],
      }
  }
}

export const useScale = (mapRef) => {
  const markerRefs = useRef([])
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on('moveend', () => {
        const max = mapRef.current.getBounds().getEast()
        const min = mapRef.current.getBounds().getWest()
        const scaleData = getScaleData({ min, max })
        console.log(scaleData)
        const newMarkers = scaleData
          .filter(({ id }) => !markerRefs.current.map(({ markerId }) => markerId).includes(id))
          .map(({ id, center, label, type }) => {
            const marker = L.marker(center, {
              icon: new L.DivIcon(getIcon({ type, label }))
            }).addTo(mapRef.current)
            marker.markerId = id
            return marker
          }).map(addDataTestIdToMarker('linked-diory-marker'))

        markerRefs.current
          .filter(({ markerId }) => !scaleData.map(({ id }) => id).includes(markerId))
          .map((marker) => marker.remove())

        const oldMarkers = markerRefs.current
          .filter(({ markerId }) => scaleData.map(({ id }) => id).includes(markerId))

        markerRefs.current = oldMarkers.concat(newMarkers)

      })
    }
  }, [mapRef, markerRefs])

  return markerRefs
}
