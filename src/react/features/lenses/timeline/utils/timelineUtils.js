import { mapDiographToDiories } from '../../../diograph/utils/diographUtils'
import { startsWithPeriodId, isPeriodId } from './periodIdUtils'

const sortByDate = ({ date }) => date

export const getDioriesInPeriod = (selectedPeriod, diograph) =>
  mapDiographToDiories(diograph)
    .filter(startsWithPeriodId(selectedPeriod))
    .filter(({ id }) => !isPeriodId(id))
    .sort(sortByDate)

export const getStartAndEndTimes = (diories) => {
  const times = diories
    .map(({ date }) => date)
    .filter(Boolean)
    .map((isoDate) => new Date(isoDate).getTime())
  return {
    startTime: times.length ? Math.min(...times) : null,
    endTime: times.length ? Math.max(...times) : null,
  }
}
