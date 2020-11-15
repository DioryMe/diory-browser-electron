import { useEffect } from 'react'
import { useInitial } from '../../../../utils/useCompare'
import { getDateLongitude } from './getLocationData'

const MAX_ZOOM = 20
const DEFAULT_LOCATION = {
  lat: 0,
  lng: getDateLongitude({ date: Date.now() }),
}

export const useTimelineBounds = (ref, { center, min, max }) => {
  const isInitial = useInitial(center)
  useEffect(() => {
    if (ref.current) {
      ref.current.setMaxBounds([
        [0, -100000],
        [0, 100000],
      ])
      if (min && max) {
        isInitial ?
          ref.current.fitBounds([min, max]) :
          ref.current.flyToBounds([min, max], { maxZoom: MAX_ZOOM })
      } else if (center) {
        isInitial ?
          ref.current.setView(center, MAX_ZOOM) :
          ref.current.flyTo(center, MAX_ZOOM)
      } else {
        isInitial ?
          ref.current.setView(DEFAULT_LOCATION, MAX_ZOOM) :
          ref.current.flyTo(DEFAULT_LOCATION, MAX_ZOOM)
      }
    }
  }, [ref, isInitial, center, min, max])
}
