import { useSelector } from 'react-redux'

import { useStoryDiories } from '../../../diograph/utils/useDiories'
import { useGetHomeDiory } from '../../../home/utils/useGetHomeDiory'

import { includedInLinks, includesDiory } from '../../../diograph/utils/dioryUtils'
import { getDioriesInPeriod } from './getDioriesInPeriod'

const addStyles = (periodStory, story, memories) => (periodMemory) => ({
  ...periodMemory,
  style: {
    ...(!includedInLinks(periodStory, periodMemory) && { opacity: '40%' }),
    ...(periodMemory.key === story.key && { border: '4px solid red' }),
    ...(includesDiory(memories, periodMemory) && { border: '4px solid yellow' }),
  },
})

export const usePeriodMemories = () => {
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const { open } = useSelector((state) => state.buttons)
  const { diograph } = useSelector((state) => state.diograph)
  const { story, memories } = useStoryDiories()
  const { getHomeDiory } = useGetHomeDiory()

  if (selectedPeriod === 'timeline') {
    return []
  }

  const periodStory = getHomeDiory(selectedPeriod)
  return getDioriesInPeriod(selectedPeriod, diograph)
    .filter((periodMemory) => open || includedInLinks(periodStory, periodMemory))
    .map(addStyles(periodStory, story, memories))
    .filter((value, index) => index < 100)
}
