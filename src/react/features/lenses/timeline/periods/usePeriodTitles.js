import { useSelector } from 'react-redux'

import { splitDateToPeriodIds } from './periodIdUtils'
import { useMapToPeriod } from './useMapToPeriod'

export const usePeriodTitles = (diograph) => {
  const { selectedPeriod } = useSelector((state) => state.lenses)

  return ['timeline']
    .concat(splitDateToPeriodIds(selectedPeriod))
    .map(useMapToPeriod(diograph))
    .map((diory) => ({ diory }))
}
