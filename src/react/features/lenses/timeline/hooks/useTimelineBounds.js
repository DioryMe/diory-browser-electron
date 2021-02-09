import { useCallback, useEffect } from 'react'
import { useFitToBounds } from '../../utils/bounds/useFitToBounds'
import { useGetBounds } from '../../utils/bounds/useGetBounds'
import { getDateLongitude, getIsoDate } from './getTimelineData'

const boundsConfig = {
  MAX_ZOOM: 20,
  DEFAULT_ZOOM: 5,
  DEFAULT_LOCATION: {
    lat: 0,
    lng: getDateLongitude({ date: new Date() }),
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

const useOnBoundsChange = (onBoundsChange) =>
  useCallback(
    ([end, start]) => {
      onBoundsChange &&
        onBoundsChange({
          startDate: getIsoDate(start[1]),
          endDate: getIsoDate(end[1]),
        })
    },
    [onBoundsChange]
  )

export const useTimelineBounds = (mapRef, dioryLocationData, fitToBounds, onBoundsChange) => {
  useSetMaxBounds(mapRef)
  useFitToBounds(mapRef, dioryLocationData, fitToBounds, boundsConfig)
  useGetBounds(mapRef, useOnBoundsChange(onBoundsChange))
}
