import { useButtons } from '../../../buttons/useButtons'
import { useDioryToSelectedEffect } from './useDioryToSelectedEffect'

import { buttons } from './buttons'

export const TakeToHomeTool = () => {
  useButtons(buttons)

  useDioryToSelectedEffect()

  return null
}
