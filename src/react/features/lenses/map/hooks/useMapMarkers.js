import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { useCompare } from '../../../../utils/useCompare'
import { useParent } from '../../../navigation/hooks/useGoSide'
import { useFocusDiory } from '../../../room/hooks'
import { getLocationData } from './getLocationData'

const createMapPopup = ({ diory = {} }) => {
  const elements = [
    diory.image && `<img src="${diory.image}" width="150px"/>`,
    diory.text && `<div>${diory.text}</div>`,
  ]
    .filter(Boolean)
    .join('')
  const content = `<div style="overflow: hidden; height: 100px}">${elements}</div>`
  return L.popup({
    closeButton: false,
  }).setContent(content)
}

const createMapMarker = ({ diory, diorys }) => {
  const { center } = getLocationData({ diory, diorys })
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
  const { diorys } = useFocusDiory()

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
      .map((diory) => createMapMarker({ diory, diorys }).addTo(mapRef.current))
      .map(addDataTestIdToMarker('linked-diory-marker'))

    markerRefs.current = oldMarkers.concat(newMarkers)
  }, [mapRef, markerRefs, diorys])
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
