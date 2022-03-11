import React from 'react'

import { useDispatchActions, useSelector } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'
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

const GridLens = () => {
  const { forward = [] } = useSelector((state) => state.navigation)
  return <GridView {...useDiograph()} {...useTools()} scrollIntoViewId={forward[0]} />
}

export default withLensContainer('grid')(GridLens)
