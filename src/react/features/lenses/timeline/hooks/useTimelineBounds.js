import { useEffect } from 'react'
import { useFitToBounds } from '../../utils/bounds/useFitToBounds'
import { getDateLongitude } from './getTimelineData'

const boundsConfig = {
  MAX_ZOOM: 20,
  DEFAULT_ZOOM: 5,
  DEFAULT_LOCATION: {
    lat: 0,
    lng: getDateLongitude({ date: new Date().toISOString() }),
  },
}

const useSetMaxBounds = (ref) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.setMaxBounds([
        [0, -100000],
        [0, 100000],
      ])
    }
  }, [ref])
}

export const useTimelineBounds = (mapRef, dioryLocationData) => {
  useSetMaxBounds(mapRef)
  useFitToBounds(mapRef, dioryLocationData, boundsConfig)
}
