import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { useSelectPeriodEffect } from './useSelectPeriodEffect'

import { usePeriodTitles } from './periods/usePeriodTitles'
import { usePeriods } from './periods/usePeriods'
import { usePeriodStory } from './utils/usePeriodStory'
import { usePeriodMemories } from './utils/usePeriodMemories'
import { usePeriodDiories } from './utils/getPeriodDiories'

import { useDispatchActions } from '../../../store'
import { useOnSelectDiory } from '../../tools/onSelectDiory/useOnSelectDiory'
import { useOnSelectStory } from '../../tools/onSelectStory'
import { useLinkDiories } from '../../tools/actions/linkDiories'
import { useUpdatePeriodDiories } from '../../tools/actions/updatePeriodDiory/useUpdatePeriodDiories'

import { selectPeriod } from '../lensesActions'

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

  const selectStory = useOnSelectStory()

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
  }
}

const TimelineLens = ({ diograph }) => {
  useSelectPeriodEffect()

  const actions = useTimelineActions(diograph)

  return (
    <TimelineView
      titles={usePeriodTitles(diograph)}
      periods={usePeriods(diograph)}
      periodStory={usePeriodStory(diograph)}
      periodMemories={usePeriodMemories(diograph)}
      periodDiories={usePeriodDiories(diograph)}
      onSelect={useOnSelectDiory()}
      onDrop={useLinkDiories()}
      {...actions}
    />
  )
}

TimelineLens.propTypes = {
  diograph: PropTypes.object,
}

export { TimelineLens }
