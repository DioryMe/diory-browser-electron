import { useEffect, useRef } from 'react'
import { useDispatch, useStore } from '../../../store'
import { setFocus } from '../../navigation/actions'
import { addDiory, removeDiory, addLink } from '../../room/actions'

const getTileURL = ({ lat, lng, zoom }) => {
  const latRad = lat * Math.PI / 180
  const xtile = parseInt(Math.floor( (lng + 180) / 360 * (1<<zoom) ))
  const ytile = parseInt(Math.floor( (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * (1<<zoom) ))
  return `${zoom}/${xtile}/${ytile}`
}

const useAddLocation = mapRef => {
  const [{ focus }] = useStore(state => state.navigation)
  const [{ active }] = useStore(state => state.operations)
  const dispatch = useDispatch()
  useEffect(() => {
    mapRef.current.off('click')

    if (active === 'addLocation') {
      mapRef.current
        .on('click', ({ latlng }) => {
          const { lat, lng } = latlng
          const id = new Date().toISOString()
          const zoom = mapRef.current.getZoom()
          const image = `http://a.tile.osm.org/${getTileURL({ lat, lng, zoom })}.png`
          dispatch(addDiory({ id, image, latitude: lat, longitude: lng }))
          dispatch(addLink({ id: focus, link: id }))
        })
    }
  }, [mapRef, active, focus, dispatch])
}

const useRemoveLocation = mapRef => {
  const [{ active }] = useStore(state => state.operations)
  const dispatch = useDispatch()
  useEffect(() => {
    mapRef.current
      .eachLayer(marker => {
        if (marker.dioryId) {
          function removeMarker() {
            marker.remove()
            dispatch(removeDiory({ id: marker.dioryId }))
          }
          if (active === 'removeLocation') {
            marker.off('click')
            marker.on('click', removeMarker)
          }
        }
      })
  }, [mapRef, active, dispatch])
}

const useSetFocus = mapRef => {
  const [{ focus }] = useStore(state => state.navigation)
  const [{ active }] = useStore(state => state.operations)
  const dispatch = useDispatch()
  useEffect(() => {
    mapRef.current
      .eachLayer(marker => {
        if (marker.dioryId) {
          if (!active) {
            marker.off('click')
            marker.on('click', () => {
              if (marker.isPopupOpen()) {
                dispatch(setFocus({ focus: marker.dioryId }))
              }
            })
          }
        }
      })
  }, [mapRef, focus, active, dispatch])
}

const useTogglePopup = mapRef => {
  const [{ focus }] = useStore(state => state.navigation)
  const [{ active }] = useStore(state => state.operations)
  const dispatch = useDispatch()
  useEffect(() => {
    mapRef.current
      .eachLayer(marker => {
        if (marker.dioryId) {
          marker.on('click', () => {
            marker.togglePopup()
          })
        }
      })
  }, [mapRef, focus, active, dispatch])
}

export const useMapOperations = (mapRef) => {
  useAddLocation(mapRef)
  useRemoveLocation(mapRef)
  useSetFocus(mapRef)
  useTogglePopup(mapRef)
}

export const operations = [{
  id: 'addLocation',
  text: 'Add location',
  data: {
    icon: 'plus'
  }
},{
  id: 'removeLocation',
  text: 'Remove location',
  data: {
    icon: 'minus'
  }
}]
