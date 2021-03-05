import React from 'react'
import { useStore } from '../../../store'
// import { useDispatchActions, useStore } from '../../../store'

// import { deleteDiory } from '../../diograph/actions'
import { useLinkDiory } from '../../diograph/hooks'

import DeleteView from './DeleteView'

import { DELETE_TOOL_BUTTON } from './buttons'

const DeleteTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const [{ link }] = useStore((state) => state.navigation)
  const { diory } = useLinkDiory()

  // const { dispatchAction } = useDispatchActions()
  return DELETE_TOOL_BUTTON === active && !!link ? (
    <DeleteView diory={diory} onDone={() => alert('jee')} /> // {dispatchAction(deleteDiory)} />
  ) : null
}

export default DeleteTool

// import { setInactive } from '../../buttons/actions'
// import { goBackward } from '../../navigation/actions'
// import { deleteDiory, deleteLink } from '../../diograph/actions'

// if (diory.id !== clickedDiory.id) {
//   dispatch(deleteLink(diory, clickedDiory))
// } else {
//   dispatch(goBackward())
//   dispatch(deleteDiory(clickedDiory))
// }
// dispatch(setInactive())
