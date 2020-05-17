import { SET_ACTIVE, SET_INACTIVE } from './actionsTypes'

export const setActive = (active) => ({
  type: SET_ACTIVE,
  payload: { active },
})

export const setInactive = () => ({
  type: SET_INACTIVE,
})
