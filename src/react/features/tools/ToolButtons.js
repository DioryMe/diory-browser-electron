import { useButtons } from '../buttons/useButtons'

import { buttons as createDioryButtons } from './actions/createDiory/buttons'
import { buttons as createLocationButtons } from './actions/createLocation/buttons'
import { buttons as deleteDioriesButtons } from './actions/deleteDiories/buttons'
import { buttons as deleteLinksButtons } from './actions/deleteLinks/buttons'
import { buttons as updateDioryButtons } from './actions/updateDiory/buttons'

export const ToolButtons = () => {
  useButtons(createDioryButtons)
  useButtons(deleteDioriesButtons)
  useButtons(deleteLinksButtons)
  useButtons(updateDioryButtons)

  return null
}
