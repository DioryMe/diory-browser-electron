import { useStore } from '../../store'
import { convertRelativePath, getUntrackedDiory } from '../../utils'

const usePrepareDiory = () => {
  const [{ connections }] = useStore((state) => state.connectors)
  return (diory) => {
    if (!diory) {
      return
    }

    const preparedDiory = getUntrackedDiory(diory)
    if (preparedDiory) {
      preparedDiory.image = convertRelativePath(preparedDiory.image, connections)
      if (preparedDiory.data) {
        preparedDiory.data[0].contentUrl = convertRelativePath(
          preparedDiory.data[0].contentUrl,
          connections
        )
      }
    }
    return preparedDiory
  }
}

const useDiory = (id) => {
  const [{ diograph = {} }] = useStore((state) => state.diograph)
  const prepareDiory = usePrepareDiory()
  return prepareDiory(diograph[id])
}

export const useDiorys = (ids = {}) => {
  const [{ diograph = {} }] = useStore((state) => state.diograph)
  const prepareDiory = usePrepareDiory()
  return Object.entries(ids)
    .map(([key, { id }]) => ({ key, ...diograph[id] }))
    .filter(({ id }) => id)
    .map(prepareDiory)
}

const useLinkedDiorys = (id, diograph) => {
  const diory = diograph[id]
  const links = diory && diory.links
  return useDiorys(links)
}

export const useFocus = () => {
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ diograph = {} }] = useStore((state) => state.diograph)
  const [{ reverseDiograph = {} }] = useStore((state) => state.diograph)
  return {
    diory: useDiory(focus),
    diorys: useLinkedDiorys(focus, diograph),
    reverseDiorys: useLinkedDiorys(focus, reverseDiograph),
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
