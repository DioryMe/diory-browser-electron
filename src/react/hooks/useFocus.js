import { setFocus } from '../actions/navigation'
import { useStore } from '../store'

export const useFocus = () => {
  const [{ focus }, dispatch] = useStore((state) => state.navigation)
  const [{ diograph }] = useStore((state) => state.diograph)
  const { links = {} } = diograph[focus] || {}
  const diorys = Object.entries(links).map(([key, { id }]) => ({ key, id: id || key, ...diograph[id || key]}))

  return {
    diory: diograph[focus],
    diorys,
    setFocus: (id) => dispatch(setFocus(id))
  }
}
