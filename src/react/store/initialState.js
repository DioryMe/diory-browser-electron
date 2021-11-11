import { initialState as buttons } from '../features/buttons/reducers'
import { initialState as tools } from '../features/tools/reducers'
import { initialState as lenses } from '../features/lenses/reducers'
import { initialState as navigation } from '../features/navigation/reducers'
import { initialState as diograph } from '../features/diograph/reducers'
import { initialState as search } from '../features/search/reducers'

export const initialState = {
  buttons,
  tools,
  lenses,
  navigation,
  diograph,
  search,
}
