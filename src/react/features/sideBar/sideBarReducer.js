import { TOGGLE_SIDE_BAR } from './sideBarActionTypes'
import { createReducer } from '../../store'

const initialState = {
  showSideBar: {
    left: false,
    right: false,
  },
}

export const toggleSideBar = (state, { payload }) => ({
  ...state,
  showSideBar: {
    ...state.showSideBar,
    [payload.id]: !state.showSideBar[payload.id],
  },
})

export default createReducer(initialState, {
  [TOGGLE_SIDE_BAR]: toggleSideBar,
})
