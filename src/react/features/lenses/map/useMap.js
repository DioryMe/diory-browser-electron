import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { useDiory } from '../../../hooks'
import { useStore } from '../../../store'
import { getLocationData } from './getLocationData'

const useFocusLocation = () => {
  const [{ focus }] = useStore(state => state.navigation)
  return getLocationData(useDiory(focus))
}

// TODO: Use store for map data
let initialBounds = true
const useInitialMapBounds = mapRef => {
  const { center, min, max } = useFocusLocation()

  if (!mapRef.current) {
    initialBounds = true
  }
  useEffect(() => {
    if (initialBounds) {
      if (mapRef.current) {
        if (min && max) {
          mapRef.current.fitBounds([min, max])
        } else if (center) {
          mapRef.current.setView(center, 15)
        } else {
          mapRef.current.fitWorld()
        }
        initialBounds = false
      }
    }
  }, [mapRef, center, min, max])
}

const useMapBounds = mapRef => {
  const { center, min, max } = useFocusLocation()
  useEffect(() => {
    if (mapRef.current) {
      if (min && max) {
        mapRef.current.flyToBounds([min, max])
      }
      else if (center) {
        mapRef.current.flyTo(center, 15)
      }
      else {
        mapRef.current.fitWorld()
      }
    }
  }, [mapRef, center, min, max])
}

export const useMap = id => {
  const mapRef = useRef(null)
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map(id, {
        layers: [
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          }),
        ],
      })
    }
  }, [id, mapRef])

  useInitialMapBounds(mapRef)
  useMapBounds(mapRef)
  return mapRef
}
