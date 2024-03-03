import { TOGGLE_MODAL } from './modalActionTypes'
import { createReducer } from '../../store'

const initialState = {
  showModal: {
    room: false,
  },
}

export const toggleModal = (state, { payload }) => ({
  ...state,
  showModal: {
    ...state.showModal,
    [payload.id]: !state.showModal[payload.id],
  },
})

export default createReducer(initialState, {
  [TOGGLE_MODAL]: toggleModal,
})
