import { useSelector, useDispatchActions } from '../../store'
import { toggleSideBar } from './sideBarActions'

export const useSideBar = () => {
  const { showSideBar } = useSelector((state) => state.sideBar)

  const { dispatchAction } = useDispatchActions()
  return {
    showSideBar,
    toggleSideBar: dispatchAction(toggleSideBar),
  }
}
