import React from 'react'

import { useStore } from '../../../store'
import { useButtons } from '../../buttons/useButtons'
import { useEditTool } from './useEditTool'
import { useEditView } from './useEditView'

import EditView from './EditView'

import buttons, { EDIT_TOOL_BUTTON } from './buttons'

const EditTool = () => {
  useButtons(buttons)

  const [{ active }] = useStore((state) => state.tools)
  const isShown = EDIT_TOOL_BUTTON === active

  const { diory, onDone: onEditToolDone } = useEditTool()
  const { updatedFields, onDone: onEditViewDone, ...editViewProps } = useEditView(diory)
  const onDone = () => {
    onEditToolDone(updatedFields)
    onEditViewDone()
  }

  return isShown ? (
    <EditView title="Edit diory" isShown={isShown} {...editViewProps} onDone={onDone} />
  ) : null
}

export default EditTool
