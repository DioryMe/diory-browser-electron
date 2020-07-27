import React from 'react'

import { useButtons } from '../../buttons/useButtons'
import { useFocusDiory } from '../../room/hooks'
import { useUpdateTool } from './useUpdateTool'
import { useUpdateView } from './useUpdateView'

import UpdateView from './UpdateView'

import buttons from './buttons'

const UpdateTool = () => {
  useButtons(buttons)
  const { isShown, onDone: onUpdateToolDone } = useUpdateTool()

  const { diory } = useFocusDiory()
  const { updatedFields, onDone: onUpdateViewDone, ...updateViewProps } = useUpdateView(diory)

  return isShown ? (
    <UpdateView
      {...updateViewProps}
      title="Update diory"
      isShown={isShown}
      onDone={() => {
        onUpdateToolDone(updatedFields)
        onUpdateViewDone()
      }}
    />
  ) : null
}

export default UpdateTool
