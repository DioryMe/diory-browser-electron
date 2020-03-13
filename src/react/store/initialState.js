import { initialState as navigation } from '../features/navigation/reducers'
import { initialState as operations } from '../features/operations/reducers'
import { initialState as lenses } from '../features/lenses/reducers'
import { initialState as room } from '../features/room/reducers'
import { initialState as home } from '../features/home/reducers'
import { initialState as connector } from '../features/connector/reducers'

export default {
  navigation,
  operations,
  lenses,
  room,
  home,
  connector,
}
