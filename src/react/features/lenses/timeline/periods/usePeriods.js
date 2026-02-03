import { useSelector } from 'react-redux'

import { getStoryDiories } from '../../../diograph/utils/getStoryDiories'
import { useMapToPeriod } from './useMapToPeriod'

import { getNonDefaultImage } from '../../../diograph/utils/getDefaultImage'
import { getPeriodIds } from './getPeriodIds'
import { findPeriodImage, isDayPeriodId, startsWithPeriodId } from './periodIdUtils'

const useEnrichPeriod = (diograph) => {
  // TODO where to get image
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

export const usePeriods = (diograph) => {
  const { selectedPeriod } = useSelector((state) => state.lenses)

  const mapToPeriod = useMapToPeriod(diograph)
  const enrichPeriodDiory = useEnrichPeriod(diograph)

  if (!selectedPeriod || isDayPeriodId(selectedPeriod)) {
    return []
  }

  return getPeriodIds(selectedPeriod, diograph).map(mapToPeriod).map(enrichPeriodDiory)
}
