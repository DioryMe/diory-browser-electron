import React from 'react'

import { useDispatchActions } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'
import { useDeleteTool } from '../../tools/delete'
import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'
import { usePlayTool } from '../../tools/play/usePlayTool'
import { useOpenTool } from '../../tools/open/useOpenTool'
import { usePageTool } from '../../tools/page/usePageTool'
import { useImportTools } from '../../tools/import/useImportTools'
import { withLensContainer } from '../withLensContainer'

import { createLink } from '../../diograph/actions'

import GridView from './GridView'

const useTools = () => {
  const selectStory = useStoryTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()
  const page = usePageTool()

  useOpenTool()
  useImportTools()

  const { playRef } = usePlayTool()
  const { dispatch } = useDispatchActions()

  return {
    page,
    playRef,
    onClick: ({ diory }) => {
      selectStory(diory)
      deleteDiory(diory)
      updateDiory(diory)
    },
    onDrop: ({ droppedId, draggedId }) => {
      dispatch(createLink({ id: droppedId }, { id: draggedId }))
    },
  }
}

const GridLens = () => <GridView {...useDiograph()} {...useTools()} />

export default withLensContainer('grid')(GridLens)
