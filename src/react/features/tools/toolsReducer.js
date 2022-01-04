import { ADD_DIORY_TO_HAND } from './toolsActionTypes'
import { createReducer } from '../../store'

const initialState = {
  hand: [],
}

const addDioryToHand = (state, { payload }) => ({
  ...state,
  hand: [payload.dioryId, ...state.hand.filter((dioryId) => dioryId !== payload.dioryId)],
})

export default createReducer(initialState, {
  [ADD_DIORY_TO_HAND]: addDioryToHand,
})
