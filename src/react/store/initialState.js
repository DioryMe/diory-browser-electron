import { initialState as buttons } from '../features/buttons/reducers'
import { initialState as connectors } from '../features/connectors/reducers'
import { initialState as filters } from '../features/filters/reducers'
import { initialState as lenses } from '../features/lenses/reducers'
import { initialState as navigation } from '../features/navigation/reducers'
import { initialState as tools } from '../features/tools/reducers'
import { initialState as room } from '../features/room/reducers'

export const initialState = {
  buttons,
  connectors,
  filters,
  lenses,
  navigation,
  tools,
  room,
}
