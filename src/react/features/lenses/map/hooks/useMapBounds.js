import { useFitToBounds } from '../../utils/bounds/useFitToBounds'
import { useGetBounds } from '../../utils/bounds/useGetBounds'

const boundsConfig = {
  MAX_ZOOM: 14,
  DEFAULT_ZOOM: 3,
  DEFAULT_LOCATION: {
    lat: 60,
    lng: 25,
  },
}

export const useMapBounds = (mapRef, dioryLocationData, fitToBounds, onBoundsChange) => {
  useFitToBounds(mapRef, dioryLocationData, fitToBounds, boundsConfig)
  useGetBounds(mapRef, onBoundsChange)
}
