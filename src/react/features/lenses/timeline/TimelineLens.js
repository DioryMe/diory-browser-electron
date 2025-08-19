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
import { getStartAndEndTimes } from './utils/getStartAndEndTimes'
import { useStoryDiories } from '../../diograph/utils/useDiories'
import { splitDateToPeriods } from './utils/splitDateToPeriods'

export { timelineLensButton }

// TODO Add moment to timeline story
// TODO Add diory to timeline story
// TODO Always (1/7) in title also
// TODO Always (1/2) pill

// TODO sort diories
const useTimelineActions = () => {
  const { dispatch } = useDispatchActions()

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

const sortByDate = ({ date }) => date

const includesDiory = (diories, diory) => diories.map(({ key }) => key).includes(diory.key)
const addStoryStyle = ({ key }) => (diory) => diory.key === key ? {...diory, style: { border: '4px solid red' }} : diory
const addMemoryStyle = (memories) => (diory) => includesDiory(memories, diory) ? {...diory, style: { border: '4px solid yellow' }} : diory

const useDateMemories = () => {
  const { selectedPeriod } = useSelector((state) => state.lenses)
  const { diograph } = useSelector((state) => state.diograph)
  const { story, memories } = useStoryDiories()

  if (selectedPeriod === 'timeline') {
    return []
  }

  // TODO Show first x around selected diory
  return mapDiographToDiories(diograph)
    .filter(startsWithPeriod(selectedPeriod))
    .sort(sortByDate)
    .map(addStoryStyle(story))
    .map(addMemoryStyle(memories))
    .filter((value,index) => index < 100)
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

  const titles = useTimelineTitles() // TODO remove
  const timePeriods = useTimePeriods() // TODO always
  const dateMemories = useDateMemories() // TODO always 50
  const actions = useTimelineActions()

  return (
    <TimelineView
      titles={titles}
      periods={timePeriods}
      memories={dateMemories}
      {...actions}
    />
  )
}
