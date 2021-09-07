import { useStore } from '../../store'
import { resolveReverseDiograph } from './resolveReverseDiograph'

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

const useLinkedDiorys = (id, diograph) => {
  const diory = diograph[id]
  const links = diory && diory.links
  return useDiorys(links)
}

export const useFocus = () => {
  const [{ focusId }] = useStore((state) => state.navigation)
  const [{ diograph = {} }] = useStore((state) => state.diograph)
  const reverseDiograph = resolveReverseDiograph(diograph)
  return {
    diory: useDiory(focusId),
    diorys: useLinkedDiorys(focusId, diograph),
    reverseDiorys: useLinkedDiorys(focusId, reverseDiograph),
  }
}

export const useLinkDiory = () => {
  const [{ link }] = useStore((state) => state.navigation)
  const [{ diograph = {} }] = useStore((state) => state.diograph)
  return {
    diory: useDiory(link),
    diorys: useLinkedDiorys(link, diograph),
  }
}
