import { useStore } from '../../../store'

export const useHand = () => {
  const [{ hand }] = useStore((state) => state.tools)
  const [{ diograph }] = useStore((state) => state.diograph)

  return {
    diorys: diograph ? hand.map((id) => diograph[id]) : [],
  }
}
