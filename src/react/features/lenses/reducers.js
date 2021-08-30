import { ADD_LENS, SELECT_LENS } from './actionsTypes'
import { createReducer } from '../../store'

const DEFAULT_LENS = 'timeline'

export const initialState = {
  selectedLensId: DEFAULT_LENS,
  lenses: [],
}

const addLens = (state, { payload }) => ({
  ...state,
  lenses: [...state.lenses, payload.id],
})

const selectLens = (state, { payload }) => ({
  ...state,
  selectedLensId: payload.id || DEFAULT_LENS,
})

export default createReducer({
  [ADD_LENS]: addLens,
  [SELECT_LENS]: selectLens,
})
