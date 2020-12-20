import { useStore } from '../../store'

export const getDiorys = (ids = {}, diograph) =>
  Object.entries(ids)
    .map(([key, { id }]) => ({ key, ...diograph[id] }))
    .filter(({ id }) => id)

export const getDiory = (id, diograph) => {
  const diory = diograph[id]
  const links = diory && diory.links
  return {
    diory,
    diorys: getDiorys(links, diograph),
  }
}

export const useDiorys = (ids = {}) => {
  const [{ diograph = {} }] = useStore((state) => state.diograph)
  console.log('useDiorys')
  return getDiorys(ids, diograph)
}

export const useFocusDiory = () => {
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ diograph = {} }] = useStore((state) => state.diograph)
  return getDiory(focus, diograph)
}

export const useFocus = () => {
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ diograph = {} }] = useStore((state) => state.diograph)
  return diograph[focus]
}

export const useLinkDiory = () => {
  const [{ link }] = useStore((state) => state.navigation)
  const [{ diograph = {} }] = useStore((state) => state.diograph)
  return getDiory(link, diograph)
}
