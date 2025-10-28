import { useSelector } from 'react-redux'

import { useStoryDiories } from '../../../diograph/utils/useDiories'
import { useMapToPeriodDiory } from './useMapToPeriodDiory'

import { findImage } from '../../../diograph/utils/dioryUtils'
import { getNonDefaultImage } from '../../../diograph/utils/getDefaultImage'
import { getPeriodIds } from './getPeriodIds'
import { isDayPeriodId, startsWithPeriodId } from '../utils/periodIdUtils'

const findPeriodImage = (selectedPeriod, diories = []) =>
  findImage(diories.filter(startsWithPeriodId(selectedPeriod)))

const useEnrichPeriodDiory = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { story, memories } = useStoryDiories()
  const storyDiories = [story].concat(memories)

  return (period) => ({
    ...period,
    image:
      getNonDefaultImage(period.image) ||
      findPeriodImage(period.id, storyDiories) ||
      findPeriodImage(period.id, Object.values(diograph)),
    style: {
      ...(storyDiories.some(startsWithPeriodId(period.id)) && { border: '2px solid yellow' }),
    },
  })
}

export const usePeriodDiories = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { selectedPeriod } = useSelector((state) => state.lenses)

  const mapToPeriod = useMapToPeriodDiory()
  const enrichPeriodDiory = useEnrichPeriodDiory()

  if (!selectedPeriod || isDayPeriodId(selectedPeriod)) {
    return []
  }

  return getPeriodIds(selectedPeriod, diograph)
    .map(mapToPeriod)
    .map(enrichPeriodDiory)
    .map((diory) => ({ diory }))
}
