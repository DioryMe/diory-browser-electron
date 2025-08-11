import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../../store'
import { useSelectStory } from '../../tools/selectStory'
import { useSelectDiory } from '../../tools/useSelectDiory'

import { useHeader, useTimelineTitles } from './utils/useTimelineTitles'
import { useTimePeriods } from './utils/useTimePeriods'

import { createLink } from '../../diograph/diographActions'
import { selectPeriod } from '../lensesActions'
import { startsWithPeriod } from './utils/startsWithPeriod'

import { TimelineView } from './TimelineView'

import timelineLensButton from './button'

export { timelineLensButton }

// TODO Add moment to timeline story
// TODO Add diory to timeline story
// TODO Always (1/7) in title also
// TODO Always (1/2) pill
const useTimelineActions = () => {
  const { storyKey } = useSelector((state) => state.navigation)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(selectPeriod({ id: null }))
  }, [dispatch, storyKey])

  const { selectStory } = useSelectStory()
  const { selectDiory } = useSelectDiory()

  return {
    onClick: ({ diory }) => {
      selectStory(diory)
      selectDiory(diory)
    },
    onAdd: () => {},
    onDrop: ({ diory, draggedDiory }) => dispatch(createLink(diory, draggedDiory)),
    onPeriodClick: ({ diory }) => {
      dispatch(selectPeriod(diory))
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

  // TODO Show first 100, show story in context, show more
  if (selectedPeriod && isDayPeriod(selectedPeriod)) {
    return mapDiographToDiories(diograph).filter(startsWithPeriod(selectedPeriod))
  }

  return []
}

export const TimelineLens = () => {
  const header = useHeader()
  const titles = useTimelineTitles() // TODO remove
  const timePeriods = useTimePeriods() // TODO always
  const dateMemories = useDateMemories() // TODO always 50
  const actions = useTimelineActions()

  return (
    <TimelineView
      header={header}
      titles={titles}
      periods={timePeriods}
      memories={dateMemories}
      {...actions}
    />
  )
}
