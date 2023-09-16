import { useSelector, useDispatchActions } from '../../store'
import { toggleSideBar } from './sideBarActions'

export const useSideBar = (id) => {
  const { showSideBar } = useSelector((state) => state.sideBar)

  const { dispatch } = useDispatchActions()
  return {
    showSideBar: showSideBar[id],
    toggleSideBar: () => dispatch(toggleSideBar(id)),
  }
}
