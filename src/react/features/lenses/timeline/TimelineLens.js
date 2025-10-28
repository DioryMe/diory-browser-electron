import React from 'react'
import { useSelector } from 'react-redux'

import { useSelectPeriodEffect } from './useSelectPeriodEffect'

import { useDispatchActions } from '../../../store'
import { useSelectDiory } from '../../tools/utils/useSelectDiory'
import { useSelectStory } from '../../tools/selectStory'
import { useLinkDiories } from '../../tools/linkDiories'
import { useUpdatePeriodDiories } from '../../tools/updatePeriodDiory/useUpdatePeriodDiories'
import { selectPeriod } from '../lensesActions'

import { useSelectedDiories } from '../../tools/utils/useSelectedDiories'
import { usePeriodTitles } from './periodDiories/usePeriodTitles'
import { usePeriodDiories } from './periodDiories/usePeriodDiories'
import { usePeriodMemories } from './utils/usePeriodMemories'
import { useButtonsAreOpen } from '../../buttons/utils/useButtonsAreOpen'

import { TimelineView } from './components/TimelineView'

export const timelineLensButton = {
  id: 'timeline',
  text: 'Timeline',
  icon: 'calendar',
}

// TODO Add diory to timeline story
// TODO Always (1/2) pill

// TODO sort diories
const useTimelineActions = () => {
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const updatePeriodDiories = useUpdatePeriodDiories()
  const buttonsAreOpen = useButtonsAreOpen()

  const selectStory = useSelectStory()

  const { dispatch } = useDispatchActions()
  return {
    onPeriodClick: ({ diory }) => {
      dispatch(selectPeriod(diory))
    },
    onMemoryClick: ({ diory }) => {
      buttonsAreOpen ?
        updatePeriodDiories({ diory, periodId: selectedPeriod }) :
        selectStory({ diory })
    },
  }
}

export const TimelineLens = () => {
  useSelectPeriodEffect()

  const memories = usePeriodMemories()
  const { mapSelectedDiory } = useSelectedDiories()

  const actions = useTimelineActions()

  return (
    <TimelineView
      titles={usePeriodTitles()}
      periods={usePeriodDiories()}
      memories={memories.map(mapSelectedDiory)}
      onSelect={useSelectDiory()}
      onDrop={useLinkDiories()}
      {...actions}
    />
  )
}
