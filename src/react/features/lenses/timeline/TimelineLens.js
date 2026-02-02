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
import { useUpdatePeriods } from '../../tools/actions/updatePeriods/useUpdatePeriods'

import { selectPeriod } from '../lensesActions'

import { TimelineView } from './components/TimelineView'

// TODO sort diories
const useTimelineActions = (diograph) => {
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const updatePeriods = useUpdatePeriods(diograph)

  const selectStory = useOnSelectStory()

  const { dispatch } = useDispatchActions()
  return {
    onPeriodClick: ({ diory }) => {
      dispatch(selectPeriod(diory))
    },
    onMemoryClick: ({ diory }) => {
      updatePeriods({ periodId: selectedPeriod, diory })
      selectStory({ diory })
    },
    onSelect: useOnSelectDiory(),
    onDrop: useLinkDiories(),
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
      {...actions}
    />
  )
}

TimelineLens.propTypes = {
  diograph: PropTypes.object,
}

export { TimelineLens }
