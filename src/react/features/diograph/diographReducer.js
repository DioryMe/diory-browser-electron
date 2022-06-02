import { SET_ROOM, SET_STORY } from './diographActionTypes'
import { /* promiseReducers , */ createReducer } from '../../store'

const initialState = {
  room: null,
  story: null,
  memories: [],
}

export const setRoom = (state, { payload: { room } }) => ({
  ...state,
  room,
})

export const setStory = (state, { payload: { storyId } }) => {
  const story = state.room.diograph.getDiory(storyId)
  const memories = state.room.diograph.getDioryWithLinks()
  return {
    ...state,
    story,
    memories,
  }
}

export default createReducer(initialState, {
  [SET_ROOM]: setRoom,
  [SET_STORY]: setStory,
  // [ADD_DIOGRAPH]: addDiograph,
  // [CREATE_DIORY]: createDiory,
  // [DELETE_DIORY]: deleteDiory,
  // [UPDATE_DIORY]: updateDiory,
  // [CREATE_LINK]: createLink,
  // [DELETE_LINK]: deleteLink,
  // [DELETE_LINKS]: deleteLinks,
  // [GET_DIOGRAPH]: getDiograph,
  // ...promiseReducers(SAVE_DIOGRAPH, 'updated', 'saving', 'saved', 'error'),
})
