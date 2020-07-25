import React from 'react'

import { useStore } from '../../../store'
import { useUpdateView } from '../update/useUpdateView'
import { useCreateTool } from './useCreateTool'
import { useButtons } from '../../buttons/useButtons'

import UpdateView from '../update/UpdateView'

import buttons, { CREATE_TOOL_BUTTON } from './buttons'

const CreateTool = () => {
  useButtons(buttons)

  const [{ active }] = useStore((state) => state.tools)
  const isShown = CREATE_TOOL_BUTTON === active

  const { updatedFields, onDone: onUpdateViewDone, ...updateViewProps } = useUpdateView()
  const { onDone: onCreateToolDone } = useCreateTool()
  const onDone = () => {
    onCreateToolDone(updatedFields)
    onUpdateViewDone()
  }

  return isShown ? <UpdateView  title="Create diory" isShown={isShown} {...updateViewProps} onDone={onDone} /> : null
}

export default CreateTool
