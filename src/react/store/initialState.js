import { initialState as connector } from '../features/connector/reducers'
import { initialState as filters } from '../features/filters/reducers'
import { initialState as lenses } from '../features/lenses/reducers'
import { initialState as navigation } from '../features/navigation/reducers'
import { initialState as tools } from '../features/tools/reducers'
import { initialState as room } from '../features/room/reducers'

export const initialState = {
  connector,
  filters,
  lenses,
  navigation,
  tools,
  room,
}
