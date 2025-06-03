import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../../store'
import { useDeleteTool } from '../../tools/delete'
import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'

import { useTimeline, useTimelineTitles } from './utils/useTimelineTitles'
import { useTimePeriods } from './utils/useTimePeriods'

import { createLink } from '../../diograph/diographActions'

import { selectPeriod } from '../lensesActions'

import { TimelineView } from './TimelineView'
import { startsWithPeriod } from './utils/startsWithPeriod'

// Diograph tools
export const useTools = () => {
  const { storyKey } = useSelector((state) => state.navigation)
  useEffect(() => {
    dispatch(selectPeriod(null))
  }, [storyKey])

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

const isDayPeriod = (period) => {
  const [date] = period.split('T')
  return date.split('-').length === 3
}

const useDateMemories = () => {
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const { diograph } = useSelector((state) => state.diograph)

  if (selectedPeriod && isDayPeriod(selectedPeriod)) {
    return mapDiographToDiories(diograph).filter(startsWithPeriod(selectedPeriod))
  }

  return []
}

export const TimelineLens = () => {
  const timeline = useTimeline()
  const titles = useTimelineTitles()
  const timePeriods = useTimePeriods()
  const dateMemories = useDateMemories()
  const tools = useTools()

  return (
    <TimelineView
      timeline={timeline}
      titles={titles}
      periods={timePeriods}
      memories={dateMemories}
      {...tools}
    />
  )
}
