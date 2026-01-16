import { useDispatchActions } from '../../../store'
import { useCreateDiory } from '../createDiory/useCreateDiory'
import { useToggleDioryLinks } from '../updateLinks/useToggleDioryLinks'
import { useGetDioryById } from '../../diograph/utils/useGetDioryById'

import { createLink } from '../../diograph/diographActions'

import { includedInLinks } from '../../diograph/utils/dioryUtils'
import { splitDateToPeriodIds } from '../../lenses/timeline/utils/periodIdUtils'

const createPeriodDiory = (period) => {
  const validDate = period.length === 13 ? `${period}:00` : period
  return {
    id: period,
    text: validDate.split('T').join(' '),
    date: new Date(validDate).toISOString(),
  }
}

const useGetPeriodDiories = (diograph) => {
  const { getDiory } = useGetDioryById(diograph)
  const createDiory = useCreateDiory()

  return (selectedPeriod) =>
    splitDateToPeriodIds(selectedPeriod)
      .reverse()
      .concat(['timeline'])
      .map((periodId) => {
        const existingDiory = getDiory(periodId)
        if (existingDiory) return existingDiory

        const periodDioryObject = createPeriodDiory(periodId)
        return createDiory(periodDioryObject)
      })
}

const useLinkPeriodDiories = () => {
  const { dispatch } = useDispatchActions()
  return (periodDiories) =>
    periodDiories.forEach((periodDiory, index, array) => {
      const nextPeriodDiory = array[index + 1]
      if (nextPeriodDiory && !includedInLinks(nextPeriodDiory, periodDiory)) {
        dispatch(createLink(nextPeriodDiory, periodDiory))
      }
    })
}

export const useUpdatePeriodDiories = (diograph) => {
  const getPeriodDiories = useGetPeriodDiories(diograph)
  const toggleDioryLinks = useToggleDioryLinks()
  const linkPeriodDiories = useLinkPeriodDiories()

  return ({ diory, periodId }) => {
    const periodDiories = getPeriodDiories(periodId)
    toggleDioryLinks(periodDiories[0], diory)
    linkPeriodDiories(periodDiories)
  }
}
