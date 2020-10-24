import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { useCompare } from '../../../../utils/useCompare'
import { useParent } from '../../../navigation/hooks/useGoSide'
import { useFocusDiory } from '../../../diograph/hooks'
import { getLocationData } from './getLocationData'

const MAX_ZOOM = 14

// TODO: Use store for map data
let initialBounds = true
const useInitialMapBounds = (mapRef) => {
  const { diory, diorys } = useFocusDiory()
  const parent = useParent()

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
          const { center: parentCenter } = getLocationData({ diory: parent })
          mapRef.current.flyTo(parentCenter, MAX_ZOOM)
        }
        initialBounds = false
      }
    }
  }, [mapRef, diory, diorys, parent])
}

const useMapBounds = (mapRef) => {
  const { diory, diorys } = useFocusDiory()
  const parent = useParent()
  const focusChanged = useCompare(diory.id)
  useEffect(() => {
    if (mapRef.current && focusChanged) {
      const { center, min, max } = getLocationData({ diory, diorys })
      if (min && max) {
        mapRef.current.flyToBounds([min, max], { maxZoom: MAX_ZOOM })
      } else if (center) {
        mapRef.current.flyTo(center, MAX_ZOOM)
      } else {
        const { center: parentCenter } = getLocationData({ diory: parent })
        mapRef.current.flyTo(parentCenter, MAX_ZOOM)
      }
    }
  }, [mapRef, focusChanged, diory, diorys, parent])
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
