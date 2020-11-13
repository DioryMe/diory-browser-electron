import { useStore } from '../../../store'

import { MOVE_LOCATION_BUTTON } from './buttons'

export const useMoveToolIsActive = () => {
  const [{ active }] = useStore((state) => state.buttons)
  return MOVE_LOCATION_BUTTON === active
}
