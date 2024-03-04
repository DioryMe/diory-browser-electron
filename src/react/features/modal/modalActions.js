import { TOGGLE_MODAL } from './modalActionTypes'

export const toggleModal = (id) => ({
  type: TOGGLE_MODAL,
  payload: { id },
})
