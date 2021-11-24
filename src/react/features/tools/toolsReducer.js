import { ADD_DIORY_TO_HAND } from './toolsActionTypes'
import { createReducer } from '../../store'

export const initialState = {
  hand: [],
}

const addDioryToHand = (state, { payload }) => ({
  ...state,
  hand: [payload.dioryId, ...state.hand.filter((dioryId) => dioryId !== payload.dioryId)],
})

export default createReducer({
  [ADD_DIORY_TO_HAND]: addDioryToHand,
})
