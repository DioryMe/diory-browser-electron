import {
  CLOSE_SIDE_BAR,
  OPEN_SIDE_BAR,
  SET_SIDE_BAR_WIDTH,
  TOGGLE_SIDE_BAR,
} from './sideBarActionTypes'
import { createReducer } from '../../store'

const initialState = {
  sideBarWidth: {
    left: 5,
    right: 5,
  },
  showSideBars: {
    left: false,
    right: false,
  },
}

export const toggleSideBar = (state, { payload }) => ({
  ...state,
  showSideBars: {
    ...state.showSideBars,
    [payload.id]: !state.showSideBars[payload.id],
  },
})

export const openSideBar = (state, { payload }) => ({
  ...state,
  showSideBars: {
    ...state.showSideBars,
    [payload.id]: true,
  },
})

export const closeSideBar = (state, { payload }) => ({
  ...state,
  showSideBars: {
    ...state.showSideBars,
    [payload.id]: false,
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
  [OPEN_SIDE_BAR]: openSideBar,
  [CLOSE_SIDE_BAR]: closeSideBar,
  [SET_SIDE_BAR_WIDTH]: setSideBarWidth,
})
