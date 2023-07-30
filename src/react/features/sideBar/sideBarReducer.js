import { TOGGLE_SIDE_BAR } from './sideBarActionTypes'
import { createReducer } from '../../store'

const initialState = {
  showSideBar: false,
}

export const toggleSideBar = (state) => ({
  ...state,
  showSideBar: !state.showSideBar,
})

export default createReducer(initialState, {
  [TOGGLE_SIDE_BAR]: toggleSideBar,
})
