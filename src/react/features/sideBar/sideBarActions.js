import { SET_SIDE_BAR_WIDTH, TOGGLE_SIDE_BAR } from './sideBarActionTypes'

export const toggleSideBar = (id) => ({
  type: TOGGLE_SIDE_BAR,
  payload: { id },
})

export const setSideBarWidth = (id, width) => ({
  type: SET_SIDE_BAR_WIDTH,
  payload: { id, width },
})
