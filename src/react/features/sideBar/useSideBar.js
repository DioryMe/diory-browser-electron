import { useDispatchActions, useSelector } from '../../store'

import { closeSideBar, openSideBar, setSideBarWidth } from './sideBarActions'

export const useSideBar = (side) => {
  const { showSideBars, sideBarWidth } = useSelector((state) => state.sideBar)

  const { dispatch } = useDispatchActions()
  const showSideBar = showSideBars[side]
  return {
    showSideBar,
    sideBarWidth: showSideBar ? sideBarWidth[side] : 0,
    toggleSideBar: () => {
      dispatch(showSideBar ? closeSideBar(side) : openSideBar(side))
    },
    openSideBar: () => {
      dispatch(openSideBar(side))
    },
    closeSideBar: () => {
      dispatch(closeSideBar(side))
    },
    onWidthChange: (newWidth) => {
      if (newWidth !== sideBarWidth[side] && newWidth !== 1) {
        dispatch(setSideBarWidth(side, newWidth))
      }
      if (newWidth > 1) {
        dispatch(openSideBar(side))
      }
      if (newWidth === 1) {
        dispatch(closeSideBar(side))
      }
    },
  }
}
