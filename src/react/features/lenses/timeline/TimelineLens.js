import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../../store'
import { useGetHomeDiory } from '../../home/utils/useGetHomeDiory'
import { useSelectDiory } from '../../tools/useSelectDiory'
import { useLinkDiories } from '../../tools/linkDiories'
import { useSelectedDiories } from '../../tools/useSelectedDiories'
import { useSelectStory } from '../../tools/selectStory'

import { usePeriodTitles } from './utils/usePeriodTitles'
import { useStoryDiories } from '../../diograph/utils/useDiories'
import { usePeriodDiories } from './utils/usePeriodDiories'
import { usePeriodMemories } from './utils/usePeriodMemories'

import { createDiory, createLink, deleteLink } from '../../diograph/diographActions'
import { selectPeriod } from '../lensesActions'

import { getStartAndEndTimes } from './utils/getStartAndEndTimes'
import { splitDateToPeriods } from './utils/splitDateToPeriods'
import { createPeriodDiory } from './utils/createPeriodDiory'
import { includedInLinks } from '../../diograph/utils/dioryUtils'

import { TimelineView } from './TimelineView'

import timelineLensButton from './button'
export { timelineLensButton }

// TODO Add moment to timeline story
// TODO Add diory to timeline story
// TODO Always (1/7) in title also
// TODO Always (1/2) pill

// TODO sort diories
const useTimelineActions = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const { open } = useSelector((state) => state.buttons)

  const { getHomeDiory } = useGetHomeDiory()
  const selectStory = useSelectStory()

  const { dispatch } = useDispatchActions()
  return {
    onPeriodClick: ({ diory }) => {
      dispatch(selectPeriod(diory))
    },
    onMemoryClick: ({ diory }) => {
      if (!open) {
        selectStory({ diory })
      }
      if (open) {
        let momentDiory = getHomeDiory(selectedPeriod)
        if (!momentDiory) {
          const periodDiory = createPeriodDiory(selectedPeriod, diograph)
          const { diory, key } = dispatch(createDiory(periodDiory))
          momentDiory = { key, ...diory }
        }
        !includedInLinks(momentDiory, diory) ? dispatch(createLink(momentDiory, diory)) : dispatch(deleteLink(momentDiory, diory))
      }
    },

  }
}

const resolvePeriod = (startTime, endTime) => {
  if (!startTime || !endTime) {
    return 'timeline'
  }
  const startPeriods = splitDateToPeriods(new Date(startTime).toISOString()).reverse()
  const endPeriods = splitDateToPeriods(new Date(endTime).toISOString()).reverse()
  return startPeriods.find((startPeriod, index) => startPeriod === endPeriods[index]) || 'timeline'
}

const useSelectPeriodEffect = () => {
  const { story, memories } = useStoryDiories()
  const diories = [story].concat(memories)
  const { startTime, endTime } = getStartAndEndTimes(diories)
  const periodId = resolvePeriod(startTime, endTime)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(selectPeriod({ id: periodId }))
  }, [periodId])
}

export const TimelineLens = () => {
  useSelectPeriodEffect()

  const memories = usePeriodMemories()
  const { mapSelectedDiory } = useSelectedDiories()

  const actions = useTimelineActions()

  return <TimelineView
    titles={usePeriodTitles()}
    periods={usePeriodDiories()}
    memories={memories.map(mapSelectedDiory)}
    onSelect={useSelectDiory()}
    onDrop={useLinkDiories()}
    {...actions} />
}
