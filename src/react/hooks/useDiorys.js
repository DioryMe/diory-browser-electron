import { useStore } from '../store'

export const useDiorys = (ids = {}) => {
  const [{ diograph }] = useStore(state => state.room)
  return Object.entries(ids).map(([key, { id }]) => ({ key, ...diograph[id] }))
}
