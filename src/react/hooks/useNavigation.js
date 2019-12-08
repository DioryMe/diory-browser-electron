import { setFocus } from '../actions/navigation'
import { useStore } from '../store'

const useNavigation = () => {
  const [{ focus }, dispatch] = useStore((state) => state.navigation)
  const [{ diograph }] = useStore((state) => state.diograph)
  const diory = diograph[focus]
  const { links } = diory
  const diorys = Object.entries(links).map(([key, { id }]) => ({ key, ...diograph[id ]}))
  console.log(diorys)

  return {
    diory: diograph[focus],
    diorys,
    setFocus: ({ id }) => dispatch(setFocus(id))
  }
}

export default useNavigation
