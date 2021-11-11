import { useFitToBounds } from '../../utils/bounds/useFitToBounds'

const boundsConfig = {
  MAX_ZOOM: 14,
  DEFAULT_ZOOM: 3,
  DEFAULT_LOCATION: {
    lat: 60,
    lng: 25,
  },
}

export const useMapBounds = (mapRef, dioryLocationData) => {
  useFitToBounds(mapRef, dioryLocationData, boundsConfig)
}
