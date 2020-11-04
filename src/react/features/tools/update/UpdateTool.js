import React from 'react'
import { useDispatchActions, useStore } from '../../../store'
import { useButtons } from '../../buttons'

import { updateDiory } from '../../room/actions'
import { useLinkDiory } from '../../room/hooks'

import UpdateView from './UpdateView'

import { buttons, UPDATE_TOOL_BUTTON } from './buttons'

const UpdateTool = () => {
  useButtons(buttons)

  const [{ active }] = useStore((state) => state.buttons)
  const [{ link }] = useStore((state) => state.navigation)
  const { diory } = useLinkDiory()

  const { dispatchAction } = useDispatchActions()
  return UPDATE_TOOL_BUTTON === active && !!link ? (
    <UpdateView diory={diory} title="Update diory" isShown onDone={dispatchAction(updateDiory)} />
  ) : null
}

export default UpdateTool
