import React from 'react'

import { useDispatchActions, useSelector } from '../../../store'
import { useToggleContent } from '../../content/useToggleContent'

import { useDeleteTool } from '../../tools/delete'
import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'
import { useImportTools } from '../../tools/import/useImportTools'

import { withLensContainer } from '../withLensContainer'

import { createLink } from '../../diograph/diographActions'

import GridView from './GridView'

const useTools = () => {
  const selectStory = useStoryTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()
  const { toggleContent } = useToggleContent()

  useImportTools()

  const { dispatch } = useDispatchActions()

  return {
    onStoryClick: ({ diory }) => {
      toggleContent()
      deleteDiory(diory)
      updateDiory(diory)
    },
    onMemoryClick: ({ diory }) => {
      selectStory(diory)
      deleteDiory(diory)
      updateDiory(diory)
    },
    onDrop: ({ droppedId, draggedId }) => {
      dispatch(createLink({ id: droppedId }, { id: draggedId }))
    },
  }
}

const getStory = (room, dioryId) => room.diograph.getDiory(dioryId)

const getMemories = (room, story) => {
  if (!story.links) {
    return []
  }

  return Object.entries(story.links)
    .map(([key, { id }]) => ({ key, ...room.diograph.getDiory(id) }))
    .filter(({ id }) => id)
}

const GridLens = () => {
  console.log('I rendered')
  const { storyId } = useSelector((state) => state.navigation)
  const { room } = useSelector((state) => state.diograph)
  const story = getStory(room, storyId)
  const memories = getMemories(room, story)

  const gridProps = {
    story,
    memories,
  }

  return <GridView {...useTools()} {...gridProps} />
}

export default withLensContainer('grid')(GridLens)
