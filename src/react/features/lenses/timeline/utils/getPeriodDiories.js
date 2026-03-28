import { useSelector } from 'react-redux'
import { useMapSelectedDiory } from '../../../tools/utils/useMapSelectedDiory'

import { includedInLinks } from '../../../diograph/utils/dioryUtils'
import { getDiographKey } from '../../../diograph/utils/diographUtils'
import { getDiory } from '../../../diograph/utils/getDiory'

import { getDioriesInPeriod } from './timelineUtils'

const getPeriodDiories = (selectedPeriodId, address, diograph) => {
  if (selectedPeriodId === 'timeline') {
    return []
  }

  const selectedPeriodDiory = getDiory(getDiographKey(address, selectedPeriodId), diograph)
  return getDioriesInPeriod(selectedPeriodId, diograph)
    .filter((diory) => !includedInLinks(selectedPeriodDiory, diory))
}

export const usePeriodDiories = (diograph) => {
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const { address } = useSelector((state) => state.diograph)
  const { mapSelectedDiory } = useMapSelectedDiory()
  return getPeriodDiories(selectedPeriod, address, diograph).map(mapSelectedDiory)
}
