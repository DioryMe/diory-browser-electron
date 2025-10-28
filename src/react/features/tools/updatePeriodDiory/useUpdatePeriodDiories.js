import { useDispatchActions } from '../../../store'
import { useGetHomeDiory } from '../../home/utils/useGetHomeDiory'

import { createDiory, createLink, deleteLink } from '../../diograph/diographActions'

import { includedInLinks } from '../../diograph/utils/dioryUtils'
import { splitDateToPeriodIds } from '../../lenses/timeline/utils/periodIdUtils'

const createPeriodDiory = (period) => {
  const validDate = period.length === 13 ? `${period}:00` : period
  return {
    key: period,
    id: period,
    text: validDate.split('T').join(' '),
    date: new Date(validDate).toISOString(),
  }
}

const useGetPeriodDiories = () => {
  const { getHomeDiory } = useGetHomeDiory()
  const { dispatch } = useDispatchActions()

  return (selectedPeriod) => splitDateToPeriodIds(selectedPeriod)
    .reverse().concat(['timeline'])
    .map(periodId => {
      const existingPeriodDiory = getHomeDiory(periodId)
      if (existingPeriodDiory) {
        return existingPeriodDiory
      }

      const periodDioryObject = createPeriodDiory(periodId)
      const { diory, key } = dispatch(createDiory(periodDioryObject))
      return { key, ...diory }
    })
}

const useLinkPeriodDiories = () => {
  const { dispatch } = useDispatchActions()

  return (periodDiories) => periodDiories.forEach((periodDiory, index, array) => {
    const nextPeriodDiory = array[index+1]
    if (!includedInLinks(nextPeriodDiory, periodDiory)) {
      dispatch(createLink(nextPeriodDiory, periodDiory))
    }
  })
}

const useToggleDioryLinks = () => {
  const { dispatch } = useDispatchActions()

  return (diory, linkedDiory) => {
    !includedInLinks(diory, linkedDiory)
      ? dispatch(createLink(diory, diory))
      : dispatch(deleteLink(diory, diory))
  }
}

export const useUpdatePeriodDiories = () => {
  const getPeriodDiories = useGetPeriodDiories()
  const linkPeriodDiories = useLinkPeriodDiories()
  const toggleDioryLInks = useToggleDioryLinks()

  return ({ diory, periodId }) => {
    const periodDiories = getPeriodDiories(periodId)
    toggleDioryLInks(periodDiories[0], diory)
    linkPeriodDiories(periodDiories)
  }
}
