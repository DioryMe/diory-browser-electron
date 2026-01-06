import { mapDiographToDiories } from '../../../diograph/utils/diographUtils'
import { startsWithPeriodId, isPeriodId } from '../utils/periodIdUtils'

const sortByDate = ({ date }) => date

export const getPeriodDiories = (selectedPeriod, diograph) =>
  mapDiographToDiories(diograph)
    .filter(startsWithPeriodId(selectedPeriod))
    .filter(({ id }) => isPeriodId(id))
    .sort(sortByDate)
