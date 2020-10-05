import { useEffect } from 'react'
import L from 'leaflet'
import { useCompare } from '../../../../utils/useCompare'

const colors = ['#5bc0eb', '#fcd600', '#9bc53d', '#e55934', '#fa7921']
const getRandom = (array) => array[Math.floor(Math.random() * array.length)]

const createPopup = ({ diory = {} }) => {
  const elements = [
    diory.text &&
      `<div style="margin: 16px; font-size: 16px; font-weight: bold; color: white">${diory.text}</div>`,
  ]
    .filter(Boolean)
    .join('')
  const content = `<div style="overflow: hidden; min-width: 600px; min-height: 400px; background-color: ${getRandom(
    colors
  )}; background-image: url(${encodeURI(
    diory.image
  )}); background-size: cover; background-position: center; background-repeat: no-repeat">${elements}</div>`
  return L.popup({
    closeButton: false,
  }).setContent(content)
}
export const useLinkPopups = (markerRefs, diorys) => {
  useEffect(() => {
    if (markerRefs.current) {
      markerRefs.current
        .filter((marker) => !marker.getPopup())
        .forEach((marker) => {
          const diory = diorys.find(({ id }) => id === marker.markerId)
          const popup = createPopup({ diory })
          marker.bindPopup(popup, {
            maxWidth: 600,
            autoPan: true,
          })
        })
    }
  }, [markerRefs, diorys])
}

// TODO: Find a better way to update popup width on image load
export const useUpdatePopup = (mapRef) => {
  useEffect(() => {
    document.querySelector('.leaflet-popup-pane').addEventListener(
      'load',
      (event) => {
        const { tagName } = event.target
        const popup = mapRef.current._popup

        if (tagName === 'IMG' && popup && !popup._updated) {
          popup._updated = true // Assumes only 1 image per Popup.
          popup.update()
        }
      },
      true
    ) // Capture the load event, because it does not bubble.
  }, [mapRef])
}
