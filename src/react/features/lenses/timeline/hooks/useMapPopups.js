import { useEffect } from 'react'
import L from 'leaflet'
import { useCompare } from '../../../../utils/useCompare'

const createPopup = ({ diory = {} }) => {
  const elements = [
    diory.image && `<img src="${diory.image}" width="150px"/>`,
    diory.date && `<div>${diory.date}</div>`,
  ]
    .filter(Boolean)
    .join('')
  const content = `<div style="overflow: hidden; height: 100px}">${elements}</div>`
  return L.popup({
    closeButton: false,
  }).setContent(content)
}

export const useDioryPopup = (markerRef, diory) => {
  const focusChanged = useCompare(diory.id)
  useEffect(() => {
    if (markerRef.current && focusChanged) {
      const popup = createPopup({ diory })
      markerRef.current
        .bindPopup(popup, {
          maxWidth: 1000,
          autoPan: false,
        })
        .openPopup()
    }
  }, [markerRef, diory, focusChanged])
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
            autoPan: false,
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
