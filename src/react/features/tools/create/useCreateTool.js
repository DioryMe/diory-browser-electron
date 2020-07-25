import { v4 as uuid } from 'uuid'

import { useDispatch } from '../../../store'
import { useFocusDiory } from '../../room/hooks'

import { createDiory, createLink } from '../../room/actions'

export const useCreateTool = () => {
  const { diory } = useFocusDiory()

  const dispatch = useDispatch()
  const onDone = (updatedFields) => {
    const createdDiory = { id: uuid(), ...updatedFields }
    dispatch(createDiory(createdDiory))
    dispatch(createLink(diory, createdDiory))
  }

  return {
    onDone,
  }
}
