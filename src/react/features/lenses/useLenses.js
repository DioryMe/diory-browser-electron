import { useLensButton } from './utils/useLensButton'

import mapLensButton from './components/map/button'
import graphLensButton from './components/graph/button'
import searchLensButton from './components/search/button'

export const useLenses = () => {
  useLensButton(mapLensButton)
  useLensButton(graphLensButton)
  useLensButton(searchLensButton)
}
