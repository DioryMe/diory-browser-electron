import { useEffect } from 'react'
import L from 'leaflet'
import { useStore } from '../../../../store'
import { useFocusDiory } from '../../../room/hooks'
import { setFocus } from '../../../navigation/actions'
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
    })
    .on('click', () => {
      if (!popup.isOpen()) {
        dispatch(setFocus({ focus: diory.id }))
      }
    })
    .on('dragend', () => {
      const { lat: latitude, lng: longitude } = marker.getLatLng()
      dispatch(updateDiory({ id: diory.id, latitude, longitude }))
    })

  return marker
}

const useDioryMarker = mapRef => {
  const { diory, diorys } = useFocusDiory()
  const dispatch = useStore()[1]

  useEffect(() => {
    const marker = createMapMarker({ diory, diorys, dispatch })
    if (marker) {
      marker
        .addTo(mapRef.current)
        .openPopup()
    }

    return () => marker && marker.remove()
  }, [mapRef, diory, diorys, dispatch])
}

const useDiorysMarkers = mapRef => {
  const { diorys } = useFocusDiory()
  const dispatch = useStore()[1]

  useEffect(() => {
    const markers = []
    diorys
      .filter(({ latitude, longitude }) => latitude && longitude)
      .forEach((diory) => {
        const marker = createMapMarker({ diory, dispatch })
          .addTo(mapRef.current)
        markers.push(marker)
      })

    return () => markers.forEach(marker => marker.remove())
  }, [mapRef, diorys, dispatch])
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
