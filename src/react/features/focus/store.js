import { createAction, createReducer } from '@reduxjs/toolkit'

export const openFocus = createAction('OPEN_FOCUS')
export const closeFocus = createAction('CLOSE_FOCUS')

export const initialState = { open: false }

export default createReducer(initialState, (builder) => {
  builder
    .addCase(openFocus, (state) => {
      state.open = true
    })
    .addCase(closeFocus, (state) => {
      state.open = false
    })
})