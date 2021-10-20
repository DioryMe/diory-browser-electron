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

export const useStory = () => {
  const [{ storyId }] = useStore((state) => state.navigation)
  return {
    story: useDiory(storyId),
    memories: useLinkedDiorys(storyId),
  }
}

export const useMemory = () => {
  const [{ memoryId }] = useStore((state) => state.navigation)
  return {
    memory: useDiory(memoryId),
  }
}
