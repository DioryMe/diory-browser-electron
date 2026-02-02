import { mapDiographToDiories } from '../../../diograph/utils/diographUtils'
import { startsWithPeriodId, isPeriodId } from './periodIdUtils'

const sortByDate = ({ date }) => date

export const getPeriodsInDiograph = (selectedPeriod, diograph) =>
  mapDiographToDiories(diograph)
    .filter(startsWithPeriodId(selectedPeriod))
    .filter(({ id }) => isPeriodId(id))
    .sort(sortByDate)
