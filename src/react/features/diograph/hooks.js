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

const useLinkedDiorys = (id, diograph) => {
  const diory = diograph[id]
  const links = diory && diory.links
  return useDiorys(links)
}

export const useDiograph = () => {
  const [{ storyId, memoryId }] = useStore((state) => state.navigation)
  const [{ diograph = {} }] = useStore((state) => state.diograph)

  return {
    story: useDiory(storyId),
    stories: useLinkedDiorys(contextId, diograph),
    memory: useDiory(memoryId),
    memories: useLinkedDiorys(storyId, diograph),
  }
}
