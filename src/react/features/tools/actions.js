import * as types from './actionsTypes'

export const setActive = active => ({
  type: types.SET_ACTIVE,
  payload: { active },
})

export const setInactive = () => ({
  type: types.SET_INACTIVE,
})
