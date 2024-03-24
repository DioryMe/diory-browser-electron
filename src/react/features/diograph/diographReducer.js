import { UPDATE_DIOGRAPH } from './diographActionTypes'
import { createReducer } from '../../store'

const initialState = {
  diograph: {},
}

export const updateDiograph = (state, { payload: { diograph } }) => ({
  ...state,
  diograph,
})

export default createReducer(initialState, {
  [UPDATE_DIOGRAPH]: updateDiograph,
})
