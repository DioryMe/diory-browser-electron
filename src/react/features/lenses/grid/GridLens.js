import React from 'react'

import { useDispatchActions } from '../../../store'

import { useLens } from '../useLens'
import { useCreateTool } from '../../tools/create'
import { useDeleteTool } from '../../tools/delete'
import { useFocusTool } from '../../tools/focus'
import { useUpdateTool } from '../../tools/update'
import { usePlayTool } from '../../tools/play/usePlayTool'
import { useOpenTool } from '../../tools/open/useOpenTool'
import { usePageTool } from '../../tools/page/usePageTool'

import { createLink } from '../../diograph/actions'

import GridView from './GridView'
import { useImportTools } from '../../tools/import/useImportTools'

import button from './diory'

import { withLensContainer } from '../LensContainer'

const useTools = () => {
  const focusDiory = useFocusTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()
  const page = usePageTool()

  useCreateTool()
  useOpenTool()
  useImportTools()

  const { playRef } = usePlayTool()
  const { dispatch } = useDispatchActions()

  return {
    page,
    playRef,
    onClick: ({ diory }) => {
      focusDiory(diory)
      deleteDiory(diory)
      updateDiory(diory)
    },
    onDrop: ({ droppedId, draggedId }) => {
      dispatch(createLink({ id: droppedId }, { id: draggedId }))
    },
  }
}

const GridLens = () => <GridView {...useLens()} {...useTools()} />

export default withLensContainer('grid', button)(GridLens)
