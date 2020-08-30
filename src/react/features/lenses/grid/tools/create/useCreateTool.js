import { v4 as uuid } from 'uuid'

import { useDispatch, useStore } from '../../../../../store'
import { useFocusDiory } from '../../../../room/hooks'

import { createDiory, createLink } from '../../../../room/actions'
import { CREATE_TOOL_BUTTON } from '../../buttons/buttons'

export const useCreateTool = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const { diory } = useFocusDiory()

  const dispatch = useDispatch()
  return {
    isShown: CREATE_TOOL_BUTTON === active,
    onDone: (updatedFields) => {
      const createdDiory = { id: uuid(), ...updatedFields }
      dispatch(createDiory(createdDiory))
      dispatch(createLink(diory, createdDiory))
    },
  }
}
