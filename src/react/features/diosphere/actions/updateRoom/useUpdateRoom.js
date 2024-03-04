import { useDispatchActions } from '../../../../store'
import { useModal } from '../../../modal/useModal'

import { updateRoom } from '../../diosphereActions'
import { selectRoom } from '../../../navigation/navigationActions'

export const useUpdateRoom = () => {
  const { dispatch } = useDispatchActions()
  const { showModal, toggleModal } = useModal('updateRoom')

  return {
    showModal,
    toggleModal,
    openUpdateRoomModal: (room) => {
      dispatch(selectRoom(room))
      toggleModal()
    },
    updateRoom: (newRoomObject) => {
      dispatch(updateRoom(newRoomObject))
      toggleModal()
    },
  }
}
