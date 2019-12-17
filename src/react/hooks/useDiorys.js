import { useStore } from '../store'

export const useDiorys = (ids = {}) => {
  const [{ diograph }] = useStore((state) => state.room)
  const diorys = Object.entries(ids).map(([key, { id }]) => ({ key, ...diograph[id]}))
  return {
    diorys,
  }
}
