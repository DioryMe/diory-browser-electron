import { useStore } from '../../store'
import { convertRelativePath, getUntrackedDiory } from '../../utils'
import { resolveReverseDiograph } from './resolveReverseDiograph'
import { useDiorys } from './useDiorys'

const prepareDiory = (diory, folderLocation) => {
  const preparedDiory = getUntrackedDiory(diory)
  if (preparedDiory) {
    preparedDiory.image = convertRelativePath(preparedDiory.image, folderLocation)
    if (preparedDiory.data) {
      preparedDiory.data[0].contentUrl = convertRelativePath(
        preparedDiory.data[0].contentUrl,
        folderLocation
      )
    }
  }
  return preparedDiory
}

// TODO: These are unprepared
const useLinkedDiorys = (id, diograph) => {
  const diory = diograph[id]
  const links = diory && diory.links
  return useDiorys(links)
}

function idIs(contextId) {
  return ({ id }) => id === contextId
}

const useSelectedContext = (contexts) => {
  const [{ contextId, backward }] = useStore((state) => state.navigation)

  if (!contexts.length) {
    return undefined
  }

  const previousStoryId = backward.length && backward[0][1]
  return contexts.find(idIs(contextId)) || contexts.find(idIs(previousStoryId)) || contexts[0]
}

const useContexts = () => {
  const [{ storyId }] = useStore((state) => state.navigation)
  const [{ diograph = {} }] = useStore((state) => state.diograph)
  const reverseDiograph = resolveReverseDiograph(diograph)

  const contexts = useLinkedDiorys(storyId, reverseDiograph)
  return {
    context: useSelectedContext(contexts),
    contexts,
  }
}

export const useDiograph = () => {
  const [{ storyId, memoryId }] = useStore((state) => state.navigation)
  const [{ diograph = {}, folderLocation }] = useStore((state) => state.diograph)

  const preparedStory = diograph[storyId] && prepareDiory(diograph[storyId], folderLocation)
  const preparedMemory = diograph[memoryId] && prepareDiory(diograph[memoryId], folderLocation)

  const { context, contexts } = useContexts()
  const contextId = context && context.id
  return {
    context,
    contexts,
    story: preparedStory,
    // TODO: These are unprepared
    stories: useLinkedDiorys(contextId, diograph),
    memory: preparedMemory,
    // TODO: These are unprepared
    memories: useLinkedDiorys(storyId, diograph),
  }
}
