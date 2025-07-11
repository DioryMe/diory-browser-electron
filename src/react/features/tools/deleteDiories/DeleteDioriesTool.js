import React from 'react'
import { useDispatchActions, useSelector } from '../../../store'

import { useButtons } from '../../buttons/useButtons'
import { useSelectedDiories } from '../useSelectedDiories'
import { useDeletedLinks } from './useDeletedLinks'
import { useCloseButtons } from '../../buttons/useButtonActions'
import { useDiories } from '../../diograph/utils/useDiories'

import { deleteDiory, deleteLinks } from '../../diograph/diographActions'
import { goBackward } from '../../navigation/navigationActions'

import { buttons, DELETE_DIORIES_BUTTON } from './buttons'

import DeleteView from '../components/DeleteView'

export const useDeleteActions = ({ diories, links }) => {
  const { story } = useDiories()
  const { closeButtons } = useCloseButtons()
  const { dispatch } = useDispatchActions()

  return {
    onDone: () => {
      diories.forEach(diory => {
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

  const { selectedDiories = [] } = useSelectedDiories()
  const deletedLinks = useDeletedLinks()
  const actions = useDeleteActions({ diories: selectedDiories, links: deletedLinks })

  const { active } = useSelector((state) => state.buttons)
  return DELETE_DIORIES_BUTTON === active && deletedLinks.length ? (
    <DeleteView title="Delete diories" diories={selectedDiories} links={deletedLinks} {...actions} />
  ) : null
}
