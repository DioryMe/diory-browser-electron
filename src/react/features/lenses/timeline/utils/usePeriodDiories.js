import { useSelector } from 'react-redux'

import { useStoryDiories } from '../../../diograph/utils/useDiories'
import { useGetHomeDiory } from '../../../home/utils/useGetHomeDiory'

import { getDefaultImage, getNonDefaultImage } from '../../../../../shared/getDefaultImage'
import { getPeriodIds } from './getPeriodIds'
import { findImage } from './createPeriodDiory'
import { startsWithPeriod } from './startsWithPeriod'
import { getPeriodTitle } from './getPeriodTitle'
import { useShowTotalState } from './useShowTotalState'

const isDayPeriod = (period) => {
  const [date] = period.split('T')
  return date.split('-').length === 3
}

const findPeriodImage = (selectedPeriod, diories = []) =>
  findImage(diories.filter(startsWithPeriod(selectedPeriod)))

export const mapToPeriodDiory =
  (storyDiories, diograph, showTotal) =>
  ({ id, image }) => ({
    diory: {
      id,
      text: getPeriodTitle(id, diograph, showTotal),
      image:
        getNonDefaultImage(image) ||
        findPeriodImage(id, storyDiories) ||
        findPeriodImage(id, Object.values(diograph)) ||
        getDefaultImage(),
    },
    isSelected: storyDiories.some(startsWithPeriod(id)),
    // hasStory
    // hasMemories
  })

export const usePeriodDiories = () => {
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const { diograph } = useSelector((state) => state.diograph)
  const { story, memories } = useStoryDiories()
  const { getHomeDiory } = useGetHomeDiory()
  const showTotal = useShowTotalState()

  if (!selectedPeriod || isDayPeriod(selectedPeriod)) {
    return []
  }

  const storyDiories = [story].concat(memories)
  return getPeriodIds(selectedPeriod, diograph)
    .map((id) => getHomeDiory(id) || { id })
    .map(mapToPeriodDiory(storyDiories, diograph, showTotal))
}
