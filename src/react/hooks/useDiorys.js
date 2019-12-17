import { useStore } from '../store'

export const useDiorys = (ids) => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const diorys = ids
    .map((id) => ({ key: id, ...diograph[id]}))
  return {
    diorys,
  }
}
