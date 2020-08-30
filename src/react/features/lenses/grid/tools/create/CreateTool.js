import React from 'react'

import { useUpdateView } from '../update/useUpdateView'
import { useCreateTool } from './useCreateTool'

import UpdateView from '../update/UpdateView'

const CreateTool = () => {
  const { isShown, onDone: onCreateToolDone } = useCreateTool()
  const { updatedFields, onDone: onUpdateViewDone, ...updateViewProps } = useUpdateView()

  return isShown ? (
    <UpdateView
      {...updateViewProps}
      title="Create diory"
      isShown={isShown}
      onDone={() => {
        onCreateToolDone(updatedFields)
        onUpdateViewDone()
      }}
    />
  ) : null
}

export default CreateTool
