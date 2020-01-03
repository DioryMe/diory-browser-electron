import * as types from './actionsTypes'
import createReducer from '../../store/createReducer'
import { promiseActionReducer } from '../../utils'

export const initialState = {
  id: null,
  diograph: {},
  updated: false,
  saving: false,
}

const getRoom = (state, { payload }) => ({
  ...state,
  id: payload.id,
  diograph: payload.diograph,
  updated: false,
})

const addDiory = (state, { payload }) => ({
  ...state,
  diograph: {
    ...state.diograph,
    [payload.diory.id]: payload.diory,
  },
  updated: true,
})

const removeDiory = (state, { payload }) => {
  const { [payload.diory.id]: omit, ...diograph } = state.diograph
  return {
    ...state,
    diograph,
    updated: true,
  }
}

const updateDiory = (state, { payload }) => ({
  ...state,
  diograph: {
    ...state.diograph,
    [payload.diory.id]: {
      ...state.diograph[payload.diory.id],
      ...payload.diory,
    },
  },
  updated: true,
})

export const saveRoomSuccess = (state) => ({
  ...state,
  updated: false,
})

export default createReducer({
  [types.GET_ROOM]: getRoom,
  [types.ADD_DIORY]: addDiory,
  [types.REMOVE_DIORY]: removeDiory,
  [types.UPDATE_DIORY]: updateDiory,
  [types.ADD_LINK]: addLink,
  ...promiseActionReducer(types.SAVE_ROOM, 'saving', 'saved', 'updated')
})
