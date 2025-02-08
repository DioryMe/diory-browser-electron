import { ADD_DIORY_TO_HAND, CLEAR_HAND } from './handActionTypes'
import { createReducer } from '../../store'

const initialState = {
  hand: [],
}

const addDioryToHand = (state, { payload }) => ({
  ...state,
  hand: [payload.diory, ...state.hand.filter((diory) => diory !== payload.diory)],
})

const clearHand = (state) => ({
  ...state,
  hand: [],
})

export default createReducer(initialState, {
  [ADD_DIORY_TO_HAND]: addDioryToHand,
  [CLEAR_HAND]: clearHand,
})
