import { SET_SIDE_BAR_WIDTH, TOGGLE_SIDE_BAR } from './sideBarActionTypes'
import { createReducer } from '../../store'

const initialState = {
  sideBarWidth: {
    left: 90,
    right: 10,
  },
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

export const setSideBarWidth = (state, { payload }) => ({
  ...state,
  sideBarWidth: {
    ...state.sideBarWidth,
    [payload.id]: payload.width,
  },
})

export default createReducer(initialState, {
  [TOGGLE_SIDE_BAR]: toggleSideBar,
  [SET_SIDE_BAR_WIDTH]: setSideBarWidth,
})
