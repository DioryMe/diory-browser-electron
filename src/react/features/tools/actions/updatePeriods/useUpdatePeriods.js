import { useSelector } from 'react-redux'

import { useCreateDiory } from '../createDiory/useCreateDiory'
import { useToggleDioryLinks } from '../toggleLinks/useToggleDioryLinks'
import { useLinkDioryArray } from '../linkDiories/useLinkDioryArray'

import {
  findPeriodImage,
  splitDateToPeriodIds,
} from '../../../lenses/timeline/periods/periodIdUtils'
import { getDiographKey } from '../../../diograph/utils/diographUtils'
import { getDiory } from '../../../diograph/utils/getDiory'

const createPeriodDiory = (periodId, diograph) => {
  const validDate = periodId.length === 13 ? `${periodId}:00` : periodId
  return {
    id: periodId,
    text: validDate.split('T').join(' '),
    image: findPeriodImage(periodId, Object.values(diograph)),
    date: new Date(validDate).toISOString(),
  }
}

const useCreatePeriodDiories = (diograph) => {
  const { address } = useSelector((state) => state.diograph)
  const createDiory = useCreateDiory()

  return (selectedPeriod) =>
    splitDateToPeriodIds(selectedPeriod)
      .reverse() // shorted period first
      .concat(['timeline'])
      .map((periodId) => {
        const existingDiory = getDiory(getDiographKey(address, periodId), diograph)
        if (existingDiory) return existingDiory

        const periodDioryObject = createPeriodDiory(periodId, diograph)
        return createDiory(periodDioryObject)
      })
}

export const useUpdatePeriods = (diograph, disabled) => {
  const createPeriodDiories = useCreatePeriodDiories(diograph)
  const toggleDioryLinks = useToggleDioryLinks()
  const linkDioryArray = useLinkDioryArray()

  return ({ diory, periodId }) => {
    const periodDiories = createPeriodDiories(periodId)
    toggleDioryLinks(periodDiories[0], diory)
    linkDioryArray(periodDiories)

    return true
  }
}
