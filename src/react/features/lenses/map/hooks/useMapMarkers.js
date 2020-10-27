import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { useCompare } from '../../../../utils/useCompare'
import { useParent } from '../../../navigation/hooks/useGoSide'
import { useFocusDiory } from '../../../diograph/hooks'
import { getLocationData } from './getLocationData'

const colors = ['#5bc0eb', '#fcd600', '#9bc53d', '#e55934', '#fa7921']
const getRandom = (array) => array[Math.floor(Math.random() * array.length)]

const getPopupStyle = ({ image }) =>
  [
    'overflow: hidden',
    'min-width: 400px',
    'min-height: 200px',
    `background-color: ${getRandom(colors)}`,
    `background-image: url(${encodeURI(image)})`,
    'background-size: cover',
    'background-position: center',
    'background-repeat: no-repeat',
  ].join(';')

const createMapPopup = ({ diory = {} }) => {
  const elements = [
    diory.text &&
      `<div style="margin: 16px; font-size: 16px; font-weight: bold; color: white">${diory.text}</div>`,
  ]
    .filter(Boolean)
    .join('')

  const content = `<div style="${getPopupStyle(diory)}">${elements}</div>`
  return L.popup({
    closeButton: false,
  }).setContent(content)
}

const createMapMarker = ({ diory, diorys, parent }) => {
  const { center } = getLocationData({ diory, diorys, parent })
  if (!center) {
    return null
  }

  const popup = createMapPopup({ diory })
  const marker = L.marker(center).bindPopup(popup, {
    maxWidth: 600,
    autoPan: false,
  })

  marker.dioryId = diory.id

  return marker
}

const addDataTestIdToMarker = (id) => (marker) => {
  marker._icon.setAttribute('data-testid', id)
  return marker
}

const useDioryMarker = (mapRef) => {
  const { diory, diorys } = useFocusDiory()
  const parent = useParent()
  const focusChanged = useCompare(diory.id)

  const markerRef = useRef(null)
  useEffect(() => {
    if (!markerRef.current) {
      const marker = createMapMarker({ diory, diorys })
      if (marker) {
        markerRef.current = addDataTestIdToMarker('diory-marker')(marker.addTo(mapRef.current))
      }
    }
    const { center } = getLocationData({ diory, diorys })
    const { center: parentCenter } = getLocationData({ diory: parent })
    if (markerRef.current && (center || parentCenter)) {
      markerRef.current.setLatLng(center || parentCenter)

      if (focusChanged) {
        const popup = createMapPopup({ diory })
        markerRef.current
          .bindPopup(popup, {
            maxWidth: 600,
            autoPan: false,
          })
          .openPopup()

        markerRef.current.dioryId = diory.id
      }
    }
  }, [mapRef, diory, diorys, focusChanged, parent])
}

const useDiorysMarkers = (mapRef) => {
  const { diory: parent, diorys } = useFocusDiory()
  const markerRefs = useRef([])
  useEffect(() => {
    markerRefs.current
      .filter(({ dioryId }) => !diorys.map(({ id }) => id).includes(dioryId))
      .map((marker) => marker.remove())

    const oldMarkers = markerRefs.current.filter(({ dioryId }) =>
      diorys.map(({ id }) => id).includes(dioryId)
    )

    const newMarkers = diorys
      .filter(({ id }) => !markerRefs.current.map(({ dioryId }) => dioryId).includes(id))
      .map((diory) => createMapMarker({ diory, diorys, parent }).addTo(mapRef.current))
      .map(addDataTestIdToMarker('linked-diory-marker'))

    markerRefs.current = oldMarkers.concat(newMarkers)
  }, [mapRef, markerRefs, diorys, parent])
}

// TODO: Find a better way to update popup width on image load
const useUpdatePopup = (mapRef) => {
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

export const useMapMarkers = (mapRef) => {
  useDioryMarker(mapRef)
  useDiorysMarkers(mapRef)
  useUpdatePopup(mapRef)
}
