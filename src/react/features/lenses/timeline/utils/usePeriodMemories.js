import { useSelector } from 'react-redux'

import { useGetHomeDiory } from '../../../home/utils/useGetHomeDiory'

import { includedInLinks } from '../../../diograph/utils/dioryUtils'
import { getDioriesInPeriod } from './timelineUtils'

const addStyles = (periodStory) => (periodMemory) => ({
  ...periodMemory,
  style: { ...(!includedInLinks(periodStory, periodMemory) && { opacity: '40%' }) },
})

export const usePeriodMemories = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const { open } = useSelector((state) => state.buttons)
  const { getHomeDiory } = useGetHomeDiory()

  if (selectedPeriod === 'timeline') {
    return []
  }

  const periodStory = getHomeDiory(selectedPeriod)
  return getDioriesInPeriod(selectedPeriod, diograph)
    .filter((periodMemory) => open || includedInLinks(periodStory, periodMemory))
    .map(addStyles(periodStory))
    .filter((value, index) => index < 100)
}
