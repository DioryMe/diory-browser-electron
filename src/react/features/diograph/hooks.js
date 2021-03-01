import { useStore } from '../../store'

const useDiory = (id) => {
  const [{ diograph = {} }] = useStore((state) => state.diograph)
  return diograph[id]
}

export const useDiorys = (ids = {}) => {
  const [{ diograph = {} }] = useStore((state) => state.diograph)
  return Object.entries(ids)
    .map(([key, { id }]) => ({ key, ...diograph[id] }))
    .filter(({ id }) => id)
}

const useLinkedDiorys = (id) => {
  const [{ diograph = {} }] = useStore((state) => state.diograph)
  const diory = diograph[id]
  const links = diory && diory.links
  return useDiorys(links)
}

export const useFocus = () => {
  const [{ focus }] = useStore((state) => state.navigation)
  return {
    diory: useDiory(focus),
    diorys: useLinkedDiorys(focus),
  }
}

export const useLinkDiory = () => {
  const [{ link }] = useStore((state) => state.navigation)
  return {
    diory: useDiory(link),
    diorys: useLinkedDiorys(link),
  }
}

export const useDiographIsReady = () => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const [{ focus }] = useStore((state) => state.navigation)
  return {
    diographIsReady: diograph && focus && !!diograph[focus],
  }
}
