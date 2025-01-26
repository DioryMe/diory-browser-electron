import { combineReducers } from 'redux'

import { RESET_STORE } from './actionsTypes'

import home from '../features/home/homeReducer'
import buttons from '../features/buttons/buttonsReducer'
import content from '../features/content/contentReducer'
import diograph from '../features/diograph/diographReducer'
import hand from '../features/hand/handReducer'
import lenses from '../features/lenses/lensesReducer'
import modal from '../features/modal/modalReducer'
import navigation from '../features/navigation/navigationReducer'
import sideBar from '../features/sideBar/sideBarReducer'

const appReducer = combineReducers({
  home,
  buttons,
  content,
  diograph,
  hand,
  lenses,
  modal,
  navigation,
  sideBar,
})

export const reducer = (state, action) => {
  if (action.type === RESET_STORE) {
    return appReducer({}, action)
  }
  return appReducer(state, action)
}
