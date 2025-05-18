import {
  CLOSE_SIDE_BAR,
  OPEN_SIDE_BAR,
  SET_SIDE_BAR_WIDTH,
} from './sideBarActionTypes'

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
