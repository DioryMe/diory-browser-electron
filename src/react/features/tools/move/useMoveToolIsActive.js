import { useStore } from '../../../store'

import { MOVE_TOOL_BUTTON } from './buttons'

export const useMoveToolIsActive = () => {
  const [{ active }] = useStore((state) => state.buttons)
  return MOVE_TOOL_BUTTON === active
}
