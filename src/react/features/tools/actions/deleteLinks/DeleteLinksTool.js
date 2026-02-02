import React from 'react'
import { useDispatchActions, useSelector } from '../../../../store'

import { useButtons } from '../../../buttons/useButtons'
import { useCloseButtons } from '../../../buttons/useButtonActions'
import { useSelectedDiories } from '../../utils/useSelectedDiories'

import { deleteLinks } from '../../../diograph/diographActions'

import { getStoryDiories } from '../../../diograph/utils/getStoryDiories'

import DeleteView from '../../components/DeleteView'

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

const mapToLinks = (diory, links) =>
  links.map((link) => ({
    fromDiory: diory,
    toDiory: link,
  }))

const useSelectedLinks = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { storyKey } = useSelector((state) => state.navigation)
  const { story } = getStoryDiories(storyKey, diograph)

  const { selectedDiories } = useSelectedDiories()
  return mapToLinks(story, selectedDiories)
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
