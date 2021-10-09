import { useDispatch, useStore } from '../../../store'
import { goSide } from '../actions'
import { useStoryDiorys } from '../../diograph/hooks'

export const useParent = () => {
  const [{ storyId, backward }] = useStore((state) => state.navigation)
  const [{ diograph }] = useStore((state) => state.diograph)
  const storyDiorys = useStoryDiorys()
  const storyDioryIds = storyDiorys.map(({ id }) => id)

  if (!storyDioryIds.length) {
    return undefined
  }

  if (storyDioryIds.includes(storyId)) {
    return diograph[storyId]
  }

  const previousDiory = backward.length && backward[0][1]
  if (storyDioryIds.includes(previousDiory)) {
    return diograph[previousDiory]
  }

  return diograph[storyDioryIds[0]]
}

const useSiblings = () => {
  const parent = useParent()

  if (!parent || !parent.links) {
    return
  }
  return Object.values(parent.links).map(({ id }) => id)
}

export const useGoSide = () => {
  const [{ focusId }] = useStore((state) => state.navigation)
  const siblingIds = useSiblings()
  const dispatch = useDispatch()

  if (!siblingIds) {
    return {}
  }

  const focusIndex = siblingIds.indexOf(focusId)
  if (focusIndex === 0) {
    return {
      goRight: () => dispatch(goSide({ focus: siblingIds[focusIndex + 1] })),
    }
  }

  if (focusIndex === siblingIds.length - 1) {
    return {
      goLeft: () => dispatch(goSide({ focus: siblingIds[focusIndex - 1] })),
    }
  }

  return {
    goRight: () => dispatch(goSide({ focus: siblingIds[focusIndex + 1] })),
    goLeft: () => dispatch(goSide({ focus: siblingIds[focusIndex - 1] })),
  }
}
