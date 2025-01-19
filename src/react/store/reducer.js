import { combineReducers } from 'redux'

import { RESET_STORE } from './actionsTypes'

import home from '../features/home/homeReducer'
import buttons from '../features/buttons/buttonsReducer'
import content from '../features/content/contentReducer'
import diory from '../features/diory/diographReducer'
import diosphere from '../features/diosphere/diosphereReducer'
import hand from '../features/hand/handReducer'
import lenses from '../features/lenses/lensesReducer'
import modal from '../features/modal/modalReducer'
import navigation from '../features/diory/navigationReducer'
import sideBar from '../features/sideBar/sideBarReducer'

const appReducer = combineReducers({
  home,
  buttons,
  content,
  diory,
  diosphere,
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
