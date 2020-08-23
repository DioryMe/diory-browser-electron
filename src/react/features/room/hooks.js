import { useStore } from '../../store'

export const useDiorys = (ids = {}) => {
  const [{ diograph = {} }] = useStore((state) => state.room)
  return Object.entries(ids)
    .map(([key, { id }]) => ({ key, ...diograph[id] }))
    .filter(({ id }) => id)
}

export const useDiory = (id) => {
  const [{ diograph = {} }] = useStore((state) => state.room)
  const diory = diograph[id]
  const links = diory && diory.links
  return {
    diory,
    diorys: useDiorys(links),
  }
}

export const useFocusDiory = () => {
  const [{ focus }] = useStore((state) => state.navigation)
  return useDiory(focus)
}
