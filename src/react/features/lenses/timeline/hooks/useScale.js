import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { getScaleData } from './getScaleData'

const addDataTestIdToMarker = (id) => (marker) => {
  marker._icon.setAttribute('data-testid', id)
  return marker
}

function getIconContainer(children) {
  return `<div style="text-align: center; font-size: 16px; font-weight: bold; color: white">${children}</div>`
}

function getIcon({ type, label, offset }) {
  switch (type) {
    case 'min':
      return {
        className: 'min-icon',
        html: getIconContainer(`<div style="text-align: left">${label}</div>`),
        iconAnchor: [7, -45 - offset],
        iconSize: [100, 10],
      }
    case 'max':
      return {
        className: 'max-icon',
        html: getIconContainer(`<div style="text-align: right">${label}</div>`),
        iconAnchor: [93, -45 - offset],
        iconSize: [100, 10],
      }
    default:
      return {
        className: 'scale-icon',
        html: getIconContainer(`<div>|</div><div>${label}</div>`),
        iconAnchor: [6, -offset],
      }
  }
}

export const useScale = (mapRef) => {
  const markerRefs = useRef([])
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on('moveend', () => {
        const minLng = mapRef.current.getBounds().getWest()
        const maxLng = mapRef.current.getBounds().getEast()
        const minLat = mapRef.current.getBounds().getSouth()
        const maxLat = mapRef.current.getBounds().getNorth()
        const scaleData = getScaleData({ minLng, maxLng, minLat, maxLat })

        const offset = mapRef.current._container.offsetHeight / 2 - 135

        const newMarkers = scaleData
          .filter(({ id }) => !markerRefs.current.map(({ markerId }) => markerId).includes(id))
          .map(({ id, center, label, type }) => {
            const marker = L.marker(center, {
              icon: new L.DivIcon(getIcon({ type, label, offset })),
            }).addTo(mapRef.current)
            marker.markerId = id
            return marker
          })
          .map(addDataTestIdToMarker('linked-diory-marker'))

        markerRefs.current
          .filter(({ markerId }) => !scaleData.map(({ id }) => id).includes(markerId))
          .map((marker) => marker.remove())

        const oldMarkers = markerRefs.current.filter(({ markerId }) =>
          scaleData.map(({ id }) => id).includes(markerId)
        )

        markerRefs.current = oldMarkers.concat(newMarkers)
      })
    }
  }, [mapRef, markerRefs])

  return markerRefs
}
