import React, { useRef } from 'react'

import { useDispatchActions } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { useLens } from '../useLens'
import { useCreateTool } from '../../tools/create'
import { useDeleteTool } from '../../tools/delete'
import { useFocusTool } from '../../tools/focus'
import { useUpdateTool } from '../../tools/update'
import { usePlayTool } from '../../tools/play/usePlayTool'

import { createLink } from '../../diograph/actions'
import { selectContext } from '../../navigation/actions'

import GridView from './GridView'

import button from './diory'

import { withLensContainer } from '../LensContainer'

const useTools = () => {
  const focusDiory = useFocusTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()
  useCreateTool()

  const { context } = useDiograph()

  const { dispatch } = useDispatchActions()

  const { playRef } = usePlayTool()

  return {
    playRef,
    onStoryClick: ({ diory }) => {
      if (diory.id === context.id) {
        focusDiory(diory)
      } else {
        dispatch(selectContext(diory))
      }
    },
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
