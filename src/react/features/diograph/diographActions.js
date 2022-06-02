import { SET_ROOM, SET_STORY } from './diographActionTypes'

export const setRoom = (room) => ({
  type: SET_ROOM,
  payload: { room },
})

export const setStory = (storyId) => ({
  type: SET_STORY,
  payload: { storyId },
})
