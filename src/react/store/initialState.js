import { initialState as buttons } from '../features/buttons/buttonsReducer'
import { initialState as tools } from '../features/tools/toolsReducer'
import { initialState as lenses } from '../features/lenses/lensesReducer'
import { initialState as navigation } from '../features/navigation/navigationReducer'
import { initialState as diograph } from '../features/diograph/diographReducer'
import { initialState as search } from '../features/search/searchReducer'
import { initialState as settings } from '../features/settings/settingsReducer'

export const initialState = {
  buttons,
  tools,
  lenses,
  navigation,
  diograph,
  search,
  settings,
}
