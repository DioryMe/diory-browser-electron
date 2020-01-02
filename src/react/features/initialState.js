import { initialState as navigation } from './navigation/reducers'
import { initialState as lenses } from './lenses/reducers'
import { initialState as home } from './home/reducers'
import { initialState as room } from './room/reducers'
import { initialState as operations } from './operations/reducers'

export default {
  navigation,
  home,
  lenses,
  room,
  operations,
}
