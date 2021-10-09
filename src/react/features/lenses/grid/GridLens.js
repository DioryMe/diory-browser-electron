import React from 'react'
import PropTypes from 'prop-types'

import { useDispatchActions } from '../../../store'

import { useCreateTool } from '../../tools/create'
import { useDeleteTool } from '../../tools/delete'
import { useUpdateTool } from '../../tools/update'
import { useFocusTool } from '../../tools/focus'

import { useLens } from '../useLens'

import { createLink } from '../../diograph/actions'
import { selectStory } from '../../navigation/actions'

import GridView from './GridView'
import { useParent } from '../../navigation/hooks/useGoSide'

const useTools = () => {
  const focusDiory = useFocusTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()
  useCreateTool()

  const selectedStoryDiory = useParent()

  const { dispatch } = useDispatchActions()
  return {
    onStoryClick: ({ diory }) => {
      if (diory.id === selectedStoryDiory.id) {
        focusDiory(diory)
      } else {
        dispatch(selectStory(diory))
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

const GridLens = () => {
  const { diory, diorys, reverseDiorys } = useLens()
  const parent = useParent()
  return (
    <GridView
      diory={diory}
      diorys={diorys}
      reverseDiorys={reverseDiorys}
      parent={parent}
      {...useTools()}
    />
  )
}

GridLens.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
}

export default GridLens
