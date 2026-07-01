import React from 'react'
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
import { useToggleDioryLinks } from '../../tools/actions/toggleLinks/useToggleDioryLinks'

const useOnPeriodDrop = (diograph, isDiory) => {
  const updatePeriods = useUpdatePeriods(diograph, !isDiory)
  const toggleDioryLinks = useToggleDioryLinks()

  return ({ diory, draggedDiory }) => {
    const periodDiory = updatePeriods({ periodId: diory.id })
    toggleDioryLinks(periodDiory, draggedDiory)
  }
}

// TODO move child periods to titles
// TODO add period story diory, drag and drop to story
// TODO sort diories
// TODO remove address from key?
const TimelineLens = ({ diograph, isDiory }) => {
  useSelectPeriodEffect()

  // const periodMemories= usePeriodMemories(diograph)
  const periodDiories = usePeriodDiories(diograph)

  const { dispatch } = useDispatchActions()
  return (
    <TimelineView
      titles={usePeriodTitles(diograph)}
      periods={usePeriods(diograph)}
      periodStory={usePeriodStory(diograph)}
      periodMemories={periodDiories}
      periodDiories={[]}
      onPeriodClick={({ diory }) => dispatch(selectPeriod(diory))}
      onMemoryClick={useOnDioryClick()}
      onSelect={useOnCheckboxClick()}
      onDrop={useLinkDiories()}
      onBackgroundDrop={useOnPeriodDrop(diograph, isDiory)}
    />
  )
}

TimelineLens.propTypes = {
  diograph: PropTypes.object,
  isDiory: PropTypes.bool,
}

export { TimelineLens }
