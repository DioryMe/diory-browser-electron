import { useSelector } from 'react-redux'
import { useMapSelectedDiory } from '../../../tools/utils/useMapSelectedDiory'

import { getDiographKey } from '../../../diograph/utils/diographUtils'
import { getDiory } from '../../../diograph/utils/getDiory'

const getPeriodStory = (selectedPeriodId, address, diograph) => {
  const selectedPeriodKey = getDiographKey(address, selectedPeriodId)
  return {
    id: selectedPeriodId,
    text: selectedPeriodId,
    ...getDiory(selectedPeriodKey, diograph),
  }
}

export const usePeriodStory = (diograph) => {
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const { address } = useSelector((state) => state.diograph)
  const { mapSelectedDiory } = useMapSelectedDiory()
  return mapSelectedDiory(getPeriodStory(selectedPeriod, address, diograph))
}
