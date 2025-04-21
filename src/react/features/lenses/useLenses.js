import { useLensButton } from './utils/useLensButton'

import mapLensButton from './map/button'
import graphLensButton from './graph/button'
import searchLensButton from './search/button'

export const useLenses = () => {
  useLensButton(mapLensButton)
  useLensButton(graphLensButton)
  useLensButton(searchLensButton)
}
