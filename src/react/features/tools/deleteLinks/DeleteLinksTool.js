import React from 'react'
import { useDispatchActions, useSelector } from '../../../store'

import { useButtons } from '../../buttons/useButtons'
import { useDeletedLinks } from './useDeletedLinks'
import { useCloseButtons } from '../../buttons/useButtonActions'

import { deleteLinks } from '../../diograph/diographActions'

import DeleteView from '../components/DeleteView'

import { buttons, DELETE_LINKS_BUTTON } from './buttons'

export const useDeleteActions = (deletedLinks) => {
  const { closeButtons } = useCloseButtons()
  const { dispatch } = useDispatchActions()
  return {
    onDone: () => {
      dispatch(deleteLinks(deletedLinks))
      closeButtons()
    },
    onCancel: closeButtons,
  }
}

export const DeleteLinksTool = () => {
  useButtons(buttons)

  const deletedLinks = useDeletedLinks()
  const actions = useDeleteActions(deletedLinks)

  const { active } = useSelector((state) => state.buttons)
  return DELETE_LINKS_BUTTON === active && deletedLinks.length ? (
    <DeleteView title="Delete links" links={deletedLinks} {...actions} />
  ) : null
}
