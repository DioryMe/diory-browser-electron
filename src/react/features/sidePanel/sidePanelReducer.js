import { CLOSE_SIDE_BAR, OPEN_SIDE_BAR, SET_SIDE_BAR_WIDTH } from './sidePanelActionTypes'
import { createReducer } from '../../store'

const initialState = {
  sidePanelWidths: {
    left: 20,
    right: 40,
    bottom: 20,
  },
  showSidePanels: {},
}

export const openSidePanel = (state, { payload }) => ({
  ...state,
  showSidePanels: {
    ...state.showSidePanels,
    [payload.id]: true,
  },
})

export const closeSidePanel = (state, { payload }) => ({
  ...state,
  showSidePanels: {
    ...state.showSidePanels,
    [payload.id]: false,
  },
})

export const setSidePanelWidth = (state, { payload }) => ({
  ...state,
  sidePanelWidths: {
    ...state.sidePanelWidths,
    [payload.id]: payload.width,
  },
})

export default createReducer(initialState, {
  [OPEN_SIDE_BAR]: openSidePanel,
  [CLOSE_SIDE_BAR]: closeSidePanel,
  [SET_SIDE_BAR_WIDTH]: setSidePanelWidth,
})
