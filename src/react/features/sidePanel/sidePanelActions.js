import { CLOSE_SIDE_BAR, OPEN_SIDE_BAR, SET_SIDE_BAR_WIDTH } from './sidePanelActionTypes'

export const openSidePanel = (id) => ({
  type: OPEN_SIDE_BAR,
  payload: { id },
})

export const closeSidePanel = (id) => ({
  type: CLOSE_SIDE_BAR,
  payload: { id },
})

export const setSidePanelWidth = (id, width) => ({
  type: SET_SIDE_BAR_WIDTH,
  payload: { id, width },
})
