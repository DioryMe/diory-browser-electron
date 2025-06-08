import React from 'react'
import { useSelector } from '../../../store'

import { useDeleteActions } from './useDeleteActions'
import { useButtons } from '../../buttons/useButtons'
import { useDeletedDiories } from './view/useDeletedDiories'

import DeleteView from './view/DeleteView'

import { buttons, DELETE_TOOL_BUTTON } from './buttons'
import { useDeleteSelectedDioriesEffect } from './useDeleteSelectedDioriesEffect'

export const DeleteTool = () => {
  useButtons(buttons)

  useDeleteSelectedDioriesEffect()

  const { active } = useSelector((state) => state.buttons)
  const { memoryKey } = useSelector((state) => state.navigation)

  const { diory, links } = useDeletedDiories()
  const actions = useDeleteActions()

  return DELETE_TOOL_BUTTON === active && !!memoryKey ? (
    <DeleteView diory={diory} links={links} {...actions} />
  ) : null
}
