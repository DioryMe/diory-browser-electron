import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { useCompare } from '../../../../hooks'
import { useStore } from '../../../../store'
import { useFocusDiory } from '../../../room/hooks'
import { updateDiory } from '../../../room/actions'
import { getLocationData } from './getLocationData'

const createMapPopup = ({ diory = {} }) => {
  const image = `<img src="${diory.image}" height="150px"/>`
  const text = `<div>${diory.text || ''}</div>`
  const content = `<div style="overflow: hidden">${image + text}</div>`
  return L
    .popup({
      closeButton: false,
    })
    .setContent(content)
}

const createMapMarker = ({ diory, diorys, dispatch }) => {
  const { center } = getLocationData({ diory, diorys })
  if (!center) {
    return null
  }

  const popup = createMapPopup({ diory })
  const marker = L
    .marker(center, { draggable: true })
    .bindPopup(popup, {
      maxWidth: 500,
      autoPan: false,
    })
    .on('dragend', () => {
      const { lat: latitude, lng: longitude } = marker.getLatLng()
      dispatch(updateDiory({ id: diory.id, latitude, longitude }))
    })

  marker.dioryId = diory.id

  return marker
}

const useDioryMarker = mapRef => {
  const { diory, diorys } = useFocusDiory()
  const dispatch = useStore()[1]
  const focusChanged = useCompare(diory.id)

  const markerRef = useRef(null)
  useEffect(() => {
    if (!markerRef.current) {
      markerRef.current = createMapMarker({ diory, diorys, dispatch })
        .addTo(mapRef.current)
    }
    const { center } = getLocationData({ diory, diorys })
    if (markerRef.current && center) {
      markerRef.current.setLatLng(center)

      if (focusChanged) {
        const popup = createMapPopup({ diory })
        markerRef.current
          .bindPopup(popup, {
            maxWidth: 500,
            autoPan: false,
          })
          .openPopup()
      }
    }
  }, [mapRef, diory, diorys, focusChanged, dispatch])
}

const useDiorysMarkers = mapRef => {
  const { diorys } = useFocusDiory()
  const dispatch = useStore()[1]

  const markerRefs = useRef([])
  useEffect(() => {
    markerRefs.current
      .filter(({ dioryId }) => !diorys.map(({ id }) => id).includes(dioryId))
      .map(marker => marker.remove())

    const oldMarkers = markerRefs.current
      .filter(({ dioryId }) => diorys.map(({ id }) => id).includes(dioryId))

    const newMarkers = diorys
      .filter(({ id }) => !markerRefs.current.map(({ dioryId }) => dioryId).includes(id))
      .filter(({ latitude, longitude }) => latitude && longitude)
      .map((diory) => createMapMarker({ diory, dispatch }).addTo(mapRef.current))

    markerRefs.current = oldMarkers.concat(newMarkers)

  }, [mapRef, markerRefs, diorys, dispatch])
}

// TODO: Find a better way to update popup width on image load
const useUpdatePopup = mapRef => {
  useEffect(() => {
    document.querySelector('.leaflet-popup-pane').addEventListener('load', function(event) {
      const
        tagName = event.target.tagName,
        popup = mapRef.current._popup

      if (tagName === 'IMG' && popup && !popup._updated) {
        popup._updated = true // Assumes only 1 image per Popup.
        popup.update()
      }
    }, true) // Capture the load event, because it does not bubble.
  }, [mapRef])
}

export const useMapMarkers = (mapRef) => {
  useDioryMarker(mapRef)
  useDiorysMarkers(mapRef)
  useUpdatePopup(mapRef)
}
