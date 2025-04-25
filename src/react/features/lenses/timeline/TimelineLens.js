import React from 'react'

import { useDispatchActions } from '../../../store'
import { useDeleteTool } from '../../tools/delete'
import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'
import { useLens } from '../utils/useLens'
import { useDiories } from '../../diograph/utils/useDiories'
import { useSelector } from 'react-redux'

import { createLink, updateDiographAction } from '../../diograph/diographActions'

import { resolveTimelineDiories } from './resolveTimelineDiories'

import { TimelineView } from './TimelineView'

export const useTools = () => {
  const selectStory = useStoryTool()
  const selectUpdatedDiory = useUpdateTool()
  const selectDeletedDiory = useDeleteTool()

  const { dispatch } = useDispatchActions()
  return {
    onClick: ({ diory }) => {
      dispatch(updateDiographAction({ [diory.key]: diory }))
      selectStory(diory)
      selectUpdatedDiory(diory)
      selectDeletedDiory(diory)
    },
    onDrop: ({ diory, draggedDiory }) => dispatch(createLink(diory, draggedDiory)),
  }
}

// Date to focus -> memories with date
// Timeline -> all memories -> dates with diories


export const TimelineLens = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { memories } = useDiories()
  const timelineDiories = resolveTimelineDiories(memories, diograph)

  const tools = useTools()

  const { enabled } = useLens('timeline')
  return enabled ? <TimelineView {...timelineDiories} {...tools} /> : null
}
