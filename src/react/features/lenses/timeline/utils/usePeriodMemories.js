import { useSelector } from 'react-redux'

import { useGetDioryById } from '../../../diograph/utils/useGetDioryById'

import { includedInLinks } from '../../../diograph/utils/dioryUtils'
import { getDioriesInPeriod } from './timelineUtils'

const addStyles = (periodStory) => (periodMemory) => ({
  ...periodMemory,
  style: { ...(!includedInLinks(periodStory, periodMemory) && { opacity: '40%' }) },
})

export const usePeriodMemories = (diograph) => {
  const { selectedPeriod, showPeriodMemories } = useSelector((state) => state.lenses)
  const { getDiory } = useGetDioryById(diograph)

  if (selectedPeriod === 'timeline') {
    return []
  }

  const periodStory = getDiory(selectedPeriod)
  return getDioriesInPeriod(selectedPeriod, diograph)
    .filter((periodMemory) => showPeriodMemories || includedInLinks(periodStory, periodMemory))
    .map(addStyles(periodStory))
    .filter((value, index) => index < 100)
}
