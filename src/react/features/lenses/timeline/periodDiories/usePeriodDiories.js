import { useSelector } from 'react-redux'

import { getStoryDiories } from '../../../diograph/utils/getStoryDiories'
import { useMapToPeriodDiory } from './useMapToPeriodDiory'

import { findImage } from '../../../diograph/utils/dioryUtils'
import { getNonDefaultImage } from '../../../diograph/utils/getDefaultImage'
import { getPeriodIds } from './getPeriodIds'
import { isDayPeriodId, startsWithPeriodId } from '../utils/periodIdUtils'

const findPeriodImage = (selectedPeriod, diories = []) =>
  findImage(diories.filter(startsWithPeriodId(selectedPeriod)))

const useEnrichPeriodDiory = (diograph) => {
  const { storyKey } = useSelector((state) => state.navigation)
  const { story, memories } = getStoryDiories(storyKey, diograph)
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

export const usePeriodDiories = (diograph) => {
  const { selectedPeriod } = useSelector((state) => state.lenses)

  const mapToPeriod = useMapToPeriodDiory(diograph)
  const enrichPeriodDiory = useEnrichPeriodDiory(diograph)

  if (!selectedPeriod || isDayPeriodId(selectedPeriod)) {
    return []
  }

  return getPeriodIds(selectedPeriod, diograph)
    .map(mapToPeriod)
    .map(enrichPeriodDiory)
    .map((diory) => ({ diory }))
}
