import { useEffect } from 'react'
import { useInitial } from '../../../../utils/useCompare'

export const useFitToBounds = (ref, { center, min, max }, fitToBounds, config) => {
  const isInitial = useInitial(center)
  useEffect(() => {
    if (ref.current && isInitial) {
      if (min && max) {
        ref.current.fitBounds([min, max], { maxZoom: config.MAX_ZOOM })
      } else if (center) {
        ref.current.setView(center, config.MAX_ZOOM)
      } else {
        ref.current.setView(config.DEFAULT_LOCATION, config.DEFAULT_ZOOM)
      }
    } else if (ref.current && fitToBounds) {
      if (min && max) {
        ref.current.flyToBounds([min, max], { maxZoom: config.MAX_ZOOM })
      } else if (center) {
        ref.current.flyTo(center, config.MAX_ZOOM)
      } else {
        ref.current.flyTo(config.DEFAULT_LOCATION, config.DEFAULT_ZOOM)
      }
    }
  }, [ref, fitToBounds, isInitial, center, min, max, config])
}