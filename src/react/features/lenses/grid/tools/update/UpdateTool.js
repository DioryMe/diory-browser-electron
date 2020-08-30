import React from 'react'
import { useDispatch, useStore } from '../../../../../store'

import { updateDiory } from '../../../../room/actions'
import { useLinkDiory } from '../../../../room/hooks'
import { useUpdateView } from './useUpdateView'

import UpdateView from './UpdateView'

import { UPDATE_TOOL_BUTTON } from '../../buttons/buttons'

const UpdateTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const { diory } = useLinkDiory()

  const { updatedFields, onDone, ...updateViewProps } = useUpdateView(diory)

  const dispatch = useDispatch()
  const isShown = UPDATE_TOOL_BUTTON === active && diory
  return isShown ? (
    <UpdateView
      {...updateViewProps}
      title="Update diory"
      isShown={isShown}
      onDone={() => {
        dispatch(updateDiory({ ...diory, ...updatedFields }))
        onDone()
      }}
    />
  ) : null
}

export default UpdateTool
