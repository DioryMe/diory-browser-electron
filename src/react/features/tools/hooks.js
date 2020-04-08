import { useStore } from '../../store'
import { setActive, setInactive } from './actions'

export const useTools = () => {
  const [{ active }, dispatch] = useStore((state) => state.tools)
  return {
    active,
    onSelect: (toolId) => dispatch(setActive(toolId)),
    onClear: () => dispatch(setInactive()),
  }
}
