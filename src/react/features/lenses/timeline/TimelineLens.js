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
import { useOnCheckboxClick } from '../../tools/useOnCheckboxClick'
import { useOnDioryClick } from '../../tools/useOnDioryClick'
import { useLinkDiories } from '../../tools/actions/linkDiories'

import { selectPeriod } from '../lensesActions'

import { TimelineView } from './components/TimelineView'
import { useUpdatePeriods } from '../../tools/actions/updatePeriods/useUpdatePeriods'

const useOnSelect = (diograph, isDiory) => {
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const updatePeriods = useUpdatePeriods(diograph, !isDiory)
  const onSelect = useOnCheckboxClick()

  return ({ diory }) => {
    updatePeriods({ periodId: selectedPeriod, diory })
    onSelect({ diory })
  }
}

// TODO remove address from key
// TODO sort diories
const TimelineLens = ({ diograph, isDiory }) => {
  useSelectPeriodEffect()

  const { dispatch } = useDispatchActions()
  return (
    <TimelineView
      titles={usePeriodTitles(diograph)}
      periods={usePeriods(diograph)}
      periodStory={usePeriodStory(diograph)}
      periodMemories={usePeriodMemories(diograph)}
      periodDiories={usePeriodDiories(diograph)}
      onPeriodClick={({ diory }) => dispatch(selectPeriod(diory))}
      onMemoryClick={useOnDioryClick()}
      onSelect={useOnSelect(diograph, isDiory)}
      onDrop={useLinkDiories()}
    />
  )
}

TimelineLens.propTypes = {
  diograph: PropTypes.object,
  isDiory: PropTypes.bool,
}

export { TimelineLens }
