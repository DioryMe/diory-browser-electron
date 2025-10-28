import React from 'react'
import { useDispatchActions, useSelector } from '../../../store'

import { useButtons } from '../../buttons/useButtons'
import { useSelectedLinks } from './useSelectedLinks'
import { useCloseButtons } from '../../buttons/useButtonActions'

import { deleteLinks } from '../../diograph/diographActions'

import DeleteView from '../components/DeleteView'

import { buttons, DELETE_LINKS_BUTTON } from './buttons'

export const useDeleteActions = (selectedLinks) => {
  const { closeButtons } = useCloseButtons()
  const { dispatch } = useDispatchActions()
  return {
    onDone: () => {
      dispatch(deleteLinks(selectedLinks))
      closeButtons()
    },
    onCancel: closeButtons,
  }
}

export const DeleteLinksTool = () => {
  useButtons(buttons)

  const selectedLinks = useSelectedLinks()
  const actions = useDeleteActions(selectedLinks)

  const { active } = useSelector((state) => state.buttons)
  return DELETE_LINKS_BUTTON === active && selectedLinks.length ? (
    <DeleteView title="Delete links" links={selectedLinks} {...actions} />
  ) : null
}
