import { useButtons } from '../../buttons'
import { useStravaButton } from './useStravaButton'

import { buttons } from './buttons'

const StravaButton = () => {
  useButtons(buttons)
  useStravaButton()
  return null
}

export default StravaButton
