import { useDispatchActions, useSelector } from '../../store'

import { closeSidePanel, openSidePanel, setSidePanelWidth } from './sidePanelActions'

export const useSidePanel = (side) => {
  const { showSidePanels, sidePanelWidths } = useSelector((state) => state.sidePanel)

  const { dispatch } = useDispatchActions()
  const showSidePanel = showSidePanels[side]
  const sidePanelWidth = sidePanelWidths[side]
  return {
    showSidePanel,
    sidePanelWidth: showSidePanel ? sidePanelWidth : 0,
    toggleSidePanel: () => {
      dispatch(showSidePanel ? closeSidePanel(side) : openSidePanel(side))
    },
    openSidePanel: () => {
      dispatch(openSidePanel(side))
    },
    closeSidePanel: () => {
      dispatch(closeSidePanel(side))
    },
  }
}
