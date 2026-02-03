import { useMapSelectedDiory } from '../../../tools/utils/useMapSelectedDiory'

import { getLinkedDiories } from '../../../diograph/utils/getLinkedDiories'

import { isNotPeriodId, useSelectedPeriodKey } from '../periods/periodIdUtils'
import { sortByDate } from './timelineUtils'

export const usePeriodMemories = (diograph) => {
  const selectedPeriodKey = useSelectedPeriodKey()

  const { mapSelectedDiory } = useMapSelectedDiory()
  return getLinkedDiories(selectedPeriodKey, diograph)
    .filter(({ id }) => isNotPeriodId(id))
    .sort(sortByDate)
    .map(mapSelectedDiory)
}
