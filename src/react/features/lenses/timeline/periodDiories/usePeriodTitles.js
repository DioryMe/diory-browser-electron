import { useSelector } from 'react-redux'

import { splitDateToPeriodIds } from '../utils/periodIdUtils'
import { useMapToPeriodDiory } from './useMapToPeriodDiory'

export const usePeriodTitles = () => {
  const { selectedPeriod } = useSelector((state) => state.lenses)

  return ['timeline']
    .concat(splitDateToPeriodIds(selectedPeriod))
    .map(useMapToPeriodDiory())
    .map((diory) => ({ diory }))
}
