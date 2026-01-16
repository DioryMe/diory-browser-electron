import React from 'react'
import { useSelector } from 'react-redux'

import { useSelectPeriodEffect } from './useSelectPeriodEffect'

import { useUpdatePeriodDiories } from '../../tools/updatePeriodDiory/useUpdatePeriodDiories'
import { useMapSelectedDiory } from '../../tools/utils/useMapSelectedDiory'
import { usePeriodTitles } from './periodDiories/usePeriodTitles'
import { usePeriodDiories } from './periodDiories/usePeriodDiories'
import { usePeriodMemories } from './utils/usePeriodMemories'

import { useDispatchActions } from '../../../store'
import { useSelectDiory } from '../../tools/utils/useSelectDiory'
import { useSelectStory } from '../../tools/selectStory'
import { useLinkDiories } from '../../tools/linkDiories'

import { selectPeriod, setShowPeriodMemories } from '../lensesActions'

import { TimelineView } from './components/TimelineView'

export const timelineLensButton = {
  id: 'timeline',
  text: 'Timeline',
  icon: 'calendar',
}

// TODO Add diory to timeline story
// TODO Always (1/2) pill

// TODO sort diories
const useTimelineActions = (diograph) => {
  const { selectedPeriod, showPeriodMemories } = useSelector((state) => state.lenses)
  const updatePeriodDiories = useUpdatePeriodDiories(diograph)

  const selectStory = useSelectStory()

  const { dispatch } = useDispatchActions()
  return {
    onPeriodClick: ({ diory }) => {
      dispatch(selectPeriod(diory))
    },
    onMemoryClick: ({ diory }) => {
      showPeriodMemories
        ? updatePeriodDiories({ diory, periodId: selectedPeriod })
        : selectStory({ diory })
    },
    onViewAllClick: () => dispatch(setShowPeriodMemories(!showPeriodMemories)),
  }
}

export const TimelineLens = ({ diograph }) => {
  useSelectPeriodEffect()

  const { showPeriodMemories } = useSelector((state) => state.lenses)
  const memories = usePeriodMemories(diograph)
  const { mapSelectedDiory } = useMapSelectedDiory()

  const actions = useTimelineActions(diograph)

  return (
    <TimelineView
      titles={usePeriodTitles(diograph)}
      periods={usePeriodDiories(diograph)}
      viewAll={{ text: showPeriodMemories ? 'SHOW PERIOD' : 'SHOW ALL' }}
      memories={memories.map(mapSelectedDiory)}
      onSelect={useSelectDiory()}
      onDrop={useLinkDiories()}
      {...actions}
    />
  )
}
