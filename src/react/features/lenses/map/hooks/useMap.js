import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { useCompare } from '../../../../utils/useCompare'
import { useFocusDiory } from '../../../room/hooks'
import { getLocationData } from './getLocationData'

const MAX_ZOOM = 14

// TODO: Use store for map data
let initialBounds = true
const useInitialMapBounds = (mapRef) => {
  const { diory, diorys } = useFocusDiory()

  if (!mapRef.current) {
    initialBounds = true
  }
  useEffect(() => {
    if (initialBounds) {
      if (mapRef.current) {
        const { center, min, max } = getLocationData({ diory, diorys })
        if (min && max) {
          mapRef.current.fitBounds([min, max])
        } else if (center) {
          mapRef.current.setView(center, MAX_ZOOM)
        } else {
          mapRef.current.fitWorld()
        }
        initialBounds = false
      }
    }
  }, [mapRef, diory, diorys])
}

const useMapBounds = (mapRef) => {
  const { diory, diorys } = useFocusDiory()
  const focusChanged = useCompare(diory.id)
  useEffect(() => {
    if (mapRef.current && focusChanged) {
      const { center, min, max } = getLocationData({ diory, diorys })
      if (min && max) {
        mapRef.current.flyToBounds([min, max], { maxZoom: MAX_ZOOM })
      } else if (center) {
        mapRef.current.flyTo(center, MAX_ZOOM)
      } else {
        mapRef.current.fitWorld()
      }
    }
  }, [mapRef, focusChanged, diory, diorys])
}

export const useMap = (id) => {
  const mapRef = useRef(null)
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map(id, {
        layers: [
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          }),
        ],
      })
    }

    return () => {
      mapRef.current.off()
      mapRef.current.remove()
    }
  }, [id, mapRef])

  useInitialMapBounds(mapRef)
  useMapBounds(mapRef)
  return mapRef
}
