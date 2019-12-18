import { setFocus } from '../navigation/actions'
import { useStore } from '../../store'
import { useDiorys } from '../../hooks'

export const useFocusDiory = () => {
  const [{ focus, next }, dispatch] = useStore((state) => state.navigation)
  const [{ diograph }] = useStore((state) => state.room)
  const diory = diograph[focus]
  return {
    diory,
    diorys: useDiorys(diory && diory.links),
    nextDiory: diograph[next],
    setFocus: (id) => dispatch(setFocus(id))
  }
}
