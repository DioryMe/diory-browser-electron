import { initialState as buttons } from '../features/buttons/reducers'
import { initialState as filters } from '../features/filters/reducers'
import { initialState as tools } from '../features/tools/reducers'
import { initialState as lenses } from '../features/lenses/reducers'
import { initialState as navigation } from '../features/navigation/reducers'
import { initialState as diograph } from '../features/diograph/reducers'
import { initialState as search } from '../features/search/reducers'

export const initialState = {
  buttons,
  filters,
  tools,
  lenses,
  navigation,
  diograph,
  search,
}
