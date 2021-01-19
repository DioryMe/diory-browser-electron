import L from 'leaflet'
import { useStore } from '../../../store'

import { reduceIdsToKeys } from '../../../utils/reduceIdsToKeys'

export const useMapFilteredDiorys = () => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const [{ map: isActive }] = useStore((state) => state.filters.active)
  const [{ map: bounds }] = useStore((state) => state.filters.filters)

  return (
    !!isActive &&
    !!bounds &&
    Object.values(diograph)
      .filter(({ latitude, longitude }) => latitude && longitude)
      .filter(({ latitude, longitude }) =>
        L.latLngBounds(bounds).contains({
          lat: latitude,
          lng: longitude,
        })
      )
      .map(({ id }) => ({ id }))
      .reduce(reduceIdsToKeys, {})
  )
}
