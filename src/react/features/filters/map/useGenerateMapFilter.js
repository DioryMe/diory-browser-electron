import L from 'leaflet'
import { useFilter } from '../hooks/useFilter'

function isDefined(number) {
  return typeof number === 'number'
}

function boundsContainsDiory(bounds, { latitude, longitude }) {
  return (
    isDefined(latitude) &&
    isDefined(longitude) &&
    L.latLngBounds(bounds).contains({
      lat: latitude,
      lng: longitude,
    })
  )
}
export const useGenerateMapFilter = () => {
  const { active, bounds } = useFilter('map')
  return (diory) =>
    !active ||
    !bounds ||
    boundsContainsDiory(bounds, diory)
}
