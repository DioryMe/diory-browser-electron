import {
  CLOSE_SIDE_BAR,
  OPEN_SIDE_BAR,
  SET_SIDE_BAR_WIDTH,
} from './sideBarActionTypes'
import { createReducer } from '../../store'

const initialState = {
  sideBarWidth: {
    left: 20,
    right: 40,
  },
  showSideBars: {
    left: false,
    right: false,
  },
}

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
  [OPEN_SIDE_BAR]: openSideBar,
  [CLOSE_SIDE_BAR]: closeSideBar,
  [SET_SIDE_BAR_WIDTH]: setSideBarWidth,
})
