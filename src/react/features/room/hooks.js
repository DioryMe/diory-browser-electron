import { setFocus } from '../navigation/actions'
import { useStore } from '../../store'
import { useDiorys } from '../../hooks'

export const useFocusDiory = () => {
  const [{ focus }, dispatch] = useStore((state) => state.navigation)
  const [{ diograph }] = useStore((state) => state.room)
  const diory = diograph[focus]
  const { diorys } = useDiorys(diory && diory.links)

  return {
    diory,
    diorys,
    setFocus: (id) => dispatch(setFocus(id))
  }
}
