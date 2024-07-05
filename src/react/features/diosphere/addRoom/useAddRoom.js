import { useDispatchActions } from '../../../store'
import { useModal } from '../../modal/useModal'

import { selectRoom } from '../../navigation/navigationActions'
import { addRoom } from '../diosphereActions'

export const useAddRoom = () => {
  const { dispatch } = useDispatchActions()
  const { showModal, toggleModal } = useModal('addRoom')

  return {
    showModal,
    toggleModal,
    openAddRoomModal: (fromRoom) => {
      fromRoom && dispatch(selectRoom(fromRoom))
      toggleModal()
    },
    addRoom: (newRoomObject) => {
      dispatch(addRoom(newRoomObject))
      toggleModal()
    },
  }
}
