import L from 'leaflet'
import { useFilter } from '../hooks/useFilter'

function boundsContainsDiory(bounds, { latlng }) {
  if (!latlng) {
    return false
  }

  const [latitude, longitude] = latlng.split(', ')
  return L.latLngBounds(bounds).contains({
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  })
}
export const useGenerateMapFilter = () => {
  const { active, bounds } = useFilter('map')
  return (diory) => !active || !bounds || boundsContainsDiory(bounds, diory)
}
