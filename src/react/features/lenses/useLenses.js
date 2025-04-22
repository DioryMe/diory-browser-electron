import { useLensButton } from './utils/useLensButton'

import mapLensButton from './map/button'
import graphLensButton from './graph/button'
import timelineLensButton from './timeline/button'
import searchLensButton from './search/button'

export const useLenses = () => {
  useLensButton(mapLensButton)
  useLensButton(graphLensButton)
  useLensButton(timelineLensButton)
  useLensButton(searchLensButton)
}
