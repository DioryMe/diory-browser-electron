import { startsWithPeriod } from './startsWithPeriod'
import { isPeriodId } from './isPeriodId'
import { mapDiographToDiories } from '../../../diograph/utils/mapDiographToDiories'

const sortByDate = ({ date }) => date

export const getPeriodDiories = (selectedPeriod, diograph) =>
  mapDiographToDiories(diograph)
    .filter(startsWithPeriod(selectedPeriod))
    .filter(({ id }) => isPeriodId(id))
    .sort(sortByDate)
