import React, { useEffect } from 'react'

import { useDispatchActions } from '../../../store'
import { useDeleteTool } from '../../tools/delete'
import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'
import { useLens } from '../utils/useLens'
import { useDiograph } from '../../diograph/useDiograph'

import { createLink, updateDiographAction } from '../../diograph/diographActions'

import { TimelineView } from './TimelineView'
import { resolveTimelineDiograph } from './resolveTimelineDiograph'
import { useSelector } from 'react-redux'
import { useHomeDiographKey } from '../../home/utils/useHomeDiographKey'
import { useDiographData } from '../../diograph/utils/useDiographData'

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
  }
}

// TODO:
// Date context
// Timeline diory in focus
// Link all diories

const useAddTimelineEffect = () => {
  const { story, memories } = useDiograph()
  const { address } = useSelector((state) => state.home)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    const { diograph } = resolveTimelineDiograph(memories)
    dispatch(updateDiographAction(diograph, address))
  }, [story.key])
}

export const TimelineLens = () => {
  useAddTimelineEffect()

  const { diograph } = useDiograph()
  const timelineKey = useHomeDiographKey('timeline')
  const timelineDiograph = useDiographData({ storyKey: timelineKey }, diograph)

  const tools = useTools()

  const { enabled } = useLens('timeline')
  return enabled ? <TimelineView {...timelineDiograph} {...tools} /> : null
}
