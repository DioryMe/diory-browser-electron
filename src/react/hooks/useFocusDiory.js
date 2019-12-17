import { setFocus } from '../actions/navigation'
import { useStore } from '../store'

export const useFocusDiory = () => {
  const [{ focus }, dispatch] = useStore((state) => state.navigation)
  const [{ diograph }] = useStore((state) => state.diograph)
  const { links = {} } = diograph[focus] || {}
  const diorys = Object.entries(links).map(([key, { id }]) => ({ key, ...diograph[id]}))

  return {
    diory: diograph[focus],
    diorys,
    setFocus: (id) => dispatch(setFocus(id))
  }
}
