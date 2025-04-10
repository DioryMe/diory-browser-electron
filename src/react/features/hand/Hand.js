import React from 'react'
import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../store'
import { useStoryTool } from '../tools/story'
import { useUpdateTool } from '../tools/update'
import { useDeleteTool } from '../tools/delete'

import { createLink } from '../diograph/diographActions'
import { addDioryToHand, clearHand } from './handActions'

import HandView from './HandView'

// TODO: Hand from diograph, save to diograph, remove from diograph
const useHand = () => {
  const { hand } = useSelector((state) => state.hand)

  const selectStory = useStoryTool()
  const updateDiory = useUpdateTool()
  const deleteDiory = useDeleteTool()

  const { dispatch } = useDispatchActions()
  return {
    diorys: hand,
    onClick: ({ diory }) => {
      selectStory(diory)
      updateDiory(diory)
      deleteDiory(diory)
    },
    onClear: () => dispatch(clearHand()),
    onDrop: ({ diory, draggedDiory }) => {
      dispatch(createLink(diory, draggedDiory))
    },
    onBackgroundDrop: ({ draggedDiory }) => dispatch(addDioryToHand(draggedDiory)),
  }
}

export const Hand = () => <HandView {...useHand()} />
