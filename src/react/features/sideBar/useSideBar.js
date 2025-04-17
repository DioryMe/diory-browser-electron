import { useDispatchActions, useSelector } from '../../store'

import { closeSideBar, openSideBar, setSideBarWidth, toggleSideBar } from './sideBarActions'

const CLOSED_SIDE_BAR_WIDTH = 5
const OPEN_SIDE_BAR_WIDTH = 20

export const useSideBarToggle = (side) => {
  const { showSideBars } = useSelector((state) => state.sideBar)

  const { dispatch } = useDispatchActions()
  const showSideBar = showSideBars[side]
  return {
    showSideBar,
    toggleSideBar: () => {
      dispatch(setSideBarWidth(side, showSideBar ? CLOSED_SIDE_BAR_WIDTH : OPEN_SIDE_BAR_WIDTH))
      setTimeout(() => {
        dispatch(toggleSideBar(side))
      }, 10)
    },
    openSideBar: (width) => {
      dispatch(setSideBarWidth(side, width || OPEN_SIDE_BAR_WIDTH))
      setTimeout(() => {
        dispatch(openSideBar(side))
      }, 10)
    },
    closeSideBar: () => {
      dispatch(setSideBarWidth(side, CLOSED_SIDE_BAR_WIDTH))
      setTimeout(() => {
        dispatch(closeSideBar(side))
      }, 10)
    },
  }
}
