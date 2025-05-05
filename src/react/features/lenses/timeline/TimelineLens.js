import React from 'react'
import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../../store'
import { useDeleteTool } from '../../tools/delete'
import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'

import { useLens } from '../utils/useLens'
import { useTimelineTitles } from './utils/useTimelineTitles'
import { useTimePeriods } from './utils/useTimePeriods'

import { createLink } from '../../diograph/diographActions'

import { selectPeriod } from '../lensesActions'
import { filterByPeriod } from './utils/filterByPeriod'

import { TimelineView } from './TimelineView'

// Diograph tools
export const useTools = () => {
  const selectStory = useStoryTool()
  const selectUpdatedDiory = useUpdateTool()
  const selectDeletedDiory = useDeleteTool()

  const { dispatch } = useDispatchActions()
  return {
    onClick: ({ diory }) => {
      selectStory(diory)
      selectUpdatedDiory(diory)
      selectDeletedDiory(diory)
    },
    onDrop: ({ diory, draggedDiory }) => dispatch(createLink(diory, draggedDiory)),
    onPeriodClick: ({ id }) => {
      dispatch(selectPeriod(id))
    },
  }
}

const mapDiographToDiories = (diograph) =>
  Object.entries(diograph).map(([key, diory]) => ({ key, ...diory }))

const useDateMemories = () => {
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const { diograph } = useSelector((state) => state.diograph)

  if (selectedPeriod === 'timeline') {
    return []
  }

  return mapDiographToDiories(filterByPeriod(selectedPeriod, diograph))
}

export const TimelineLens = () => {
  const titles = useTimelineTitles()
  const timePeriods = useTimePeriods()
  const dateMemories = useDateMemories()
  const tools = useTools()

  const { enabled } = useLens('timeline')
  return !enabled ? null : (
    <TimelineView titles={titles} periods={timePeriods} memories={dateMemories} {...tools} />
  )
}
