import { useSelector } from 'react-redux'

import { useCreateDiory } from '../createDiory/useCreateDiory'
import { useToggleDioryLinks } from '../toggleLinks/useToggleDioryLinks'
import { useLinkDioryArray } from '../linkDiories/useLinkDioryArray'
import { useButtons } from '../../../buttons/useButtons'

import { splitDateToPeriodIds } from '../../../lenses/timeline/periods/periodIdUtils'
import { getDiographKey } from '../../../diograph/utils/diographUtils'
import { getDiory } from '../../../diograph/utils/getDiory'

import { buttons, BUTTON } from './buttons'

const createPeriodDiory = (period) => {
  const validDate = period.length === 13 ? `${period}:00` : period
  return {
    id: period,
    text: validDate.split('T').join(' '),
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

        const periodDioryObject = createPeriodDiory(periodId)
        return createDiory(periodDioryObject)
      })
}

export const useUpdatePeriods = (diograph) => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)

  const createPeriodDiories = useCreatePeriodDiories(diograph)
  const toggleDioryLinks = useToggleDioryLinks()
  const linkDioryArray = useLinkDioryArray()

  return ({ diory, periodId }) => {
    if (BUTTON === active) {
      const periodDiories = createPeriodDiories(periodId)
      toggleDioryLinks(periodDiories[0], diory)
      linkDioryArray(periodDiories)
    }
  }
}

// update selectedDiories on button click
