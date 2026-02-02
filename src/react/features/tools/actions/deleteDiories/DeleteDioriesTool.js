import React from 'react'
import { useDispatchActions, useSelector } from '../../../../store'

import { useButtons } from '../../../buttons/useButtons'
import { useSelectedDiories } from '../../utils/useSelectedDiories'
import { useDeletedDiories } from './useDeletedDiories'
import { useCloseButtons } from '../../../buttons/useButtonActions'

import { deleteDiory, deleteLinks } from '../../../diograph/diographActions'
import { goBackward } from '../../../navigation/navigationActions'

import { getStoryDiories } from '../../../diograph/utils/getStoryDiories'

import { buttons, DELETE_DIORIES_BUTTON } from './buttons'

import DeleteView from '../../components/DeleteView'

export const useDeleteActions = ({ story, diories, links }) => {
  const { closeButtons } = useCloseButtons()

  const { dispatch } = useDispatchActions()
  return {
    onDone: () => {
      diories.forEach((diory) => {
        dispatch(deleteDiory(diory))
      })
      dispatch(deleteLinks(links))

      if (diories.includes(story)) {
        dispatch(goBackward())
      }
      closeButtons()
    },
    onCancel: closeButtons,
  }
}

export const DeleteDioriesTool = () => {
  useButtons(buttons)

  const { diograph } = useSelector((state) => state.diograph)
  const { storyKey } = useSelector((state) => state.navigation)
  const { story } = getStoryDiories(storyKey, diograph)

  const { selectedDiories = [] } = useSelectedDiories()
  const deletedLinks = useDeletedDiories(diograph, selectedDiories)
  const actions = useDeleteActions({ story, diories: selectedDiories, links: deletedLinks })

  const { active } = useSelector((state) => state.buttons)
  return DELETE_DIORIES_BUTTON === active && deletedLinks.length ? (
    <DeleteView
      title="Delete diories"
      diories={selectedDiories}
      links={deletedLinks}
      {...actions}
    />
  ) : null
}
