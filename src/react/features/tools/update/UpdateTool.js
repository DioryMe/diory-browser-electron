import React from 'react'

import { useStore } from '../../../store'
import { useButtons } from '../../buttons/useButtons'
import { useUpdateTool } from './useUpdateTool'
import { useUpdateView } from './useUpdateView'

import UpdateView from './UpdateView'

import buttons, { UPDATE_TOOL_BUTTON } from './buttons'

const UpdateTool = () => {
  useButtons(buttons)

  const [{ active }] = useStore((state) => state.tools)
  const isShown = UPDATE_TOOL_BUTTON === active

  const { diory, onDone: onUpdateToolDone } = useUpdateTool()
  const { updatedFields, onDone: onUpdateViewDone, ...updateViewProps } = useUpdateView(diory)
  const onDone = () => {
    onUpdateToolDone(updatedFields)
    onUpdateViewDone()
  }

  return isShown ? (
    <UpdateView title="Update diory" isShown={isShown} {...updateViewProps} onDone={onDone} />
  ) : null
}

export default UpdateTool
