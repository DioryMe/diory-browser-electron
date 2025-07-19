import { useEffect } from 'react'
import { useInitial } from '../../../../utils/useCompare'

export const useFitToBounds = (ref, { center, min, max }, config) => {
  const centerString = center ? JSON.stringify(center) : null
  const isInitial = useInitial(true)
  useEffect(() => {
    if (ref.current) {
      if (min && max) {
        ref.current.fitBounds([min, max], { maxZoom: config.MAX_ZOOM })
        return
      }

      if (centerString) {
        const center = JSON.parse(centerString)
        isInitial ?  ref.current.setView(center, config.MAX_ZOOM) : ref.current.flyTo(center, config.MAX_ZOOM)
        return
      }

      if (isInitial) {
        ref.current.setView(config.DEFAULT_LOCATION, config.DEFAULT_ZOOM)
      }
    }
  }, [ref, isInitial, centerString, min, max, config])
}
