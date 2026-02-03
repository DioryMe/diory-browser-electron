import { mapDiographToDiories } from '../../../diograph/utils/diographUtils'
import { startsWithPeriodId, isPeriodId } from './periodIdUtils'
import { sortByDate } from '../utils/timelineUtils'

export const getPeriodsInDiograph = (selectedPeriod, diograph) =>
  mapDiographToDiories(diograph)
    .filter(startsWithPeriodId(selectedPeriod))
    .filter(({ id }) => isPeriodId(id))
    .sort(sortByDate)
