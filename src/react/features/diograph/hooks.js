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
  const [{ focusId }] = useStore((state) => state.navigation)
  return {
    diory: useDiory(focusId),
    diorys: useLinkedDiorys(focusId),
  }
}

export const useLinkDiory = () => {
  const [{ selectedDioryId }] = useStore((state) => state.navigation)
  return {
    diory: useDiory(selectedDioryId),
    diorys: useLinkedDiorys(selectedDioryId),
  }
}
