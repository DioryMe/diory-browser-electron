import { TOGGLE_SIDE_BAR } from './sideBarActionTypes'

export const toggleSideBar = (id) => ({
  type: TOGGLE_SIDE_BAR,
  payload: { id },
})
