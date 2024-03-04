import { useDispatchActions } from '../../../../store'
import { useModal } from '../../../modal/useModal'
import { useDiosphere } from '../../useDiosphere'

import { addDoor, addRoom } from '../../diosphereActions'
import { selectRoom } from '../../../navigation/navigationActions'

export const useAddRoom = () => {
  const { dispatch } = useDispatchActions()
  const { showModal, toggleModal } = useModal('addRoom')
  const { room } = useDiosphere()

  return {
    showModal,
    toggleModal,
    openAddRoomModal: (fromRoom) => {
      dispatch(selectRoom(fromRoom))
      toggleModal()
    },
    addRoom: (newRoomObject) => {
      const { room: newRoom } = dispatch(addRoom(newRoomObject))
      dispatch(addDoor(room, newRoom))
      toggleModal()
    },
  }
}
