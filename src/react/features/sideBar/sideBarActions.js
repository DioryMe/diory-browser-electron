import {
  CLOSE_SIDE_BAR,
  OPEN_SIDE_BAR,
  SET_SIDE_BAR_WIDTH,
  TOGGLE_SIDE_BAR,
} from './sideBarActionTypes'

export const toggleSideBar = (id) => ({
  type: TOGGLE_SIDE_BAR,
  payload: { id },
})

export const openSideBar = (id) => ({
  type: OPEN_SIDE_BAR,
  payload: { id },
})

export const closeSideBar = (id) => ({
  type: CLOSE_SIDE_BAR,
  payload: { id },
})

export const setSideBarWidth = (id, width) => ({
  type: SET_SIDE_BAR_WIDTH,
  payload: { id, width },
})
