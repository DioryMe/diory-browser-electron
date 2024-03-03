import { useSelector, useDispatchActions } from '../../store'
import { toggleModal } from './modalActions'

export const useModal = (id) => {
  const { showModal } = useSelector((state) => state.modal)

  const { dispatch } = useDispatchActions()
  return {
    showModal: showModal[id],
    toggleModal: () => dispatch(toggleModal(id)),
  }
}
