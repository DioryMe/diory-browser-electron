import { useEffect } from 'react'
import { getLongitudeDate } from './getLocationData'

export const useTimelineClick = (mapRef, onMapClick) => {
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.off('click')
      mapRef.current.on('click', ({ latlng: { lng } }) => {
        const date = getLongitudeDate(lng).toISOString()
        onMapClick({ date })
      })
    }
  }, [mapRef, onMapClick])
}
