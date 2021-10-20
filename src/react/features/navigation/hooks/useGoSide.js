import { useDispatch, useStore } from '../../../store'
import { goSide } from '../actions'

export const useParent = () => {
  const [{ backward }] = useStore((state) => state.navigation)
  const [{ diograph }] = useStore((state) => state.diograph)
  if (!backward.length) {
    return
  }
  const parentId = backward[0][1]
  return parentId && diograph && diograph[parentId]
}

const useSiblings = () => {
  const parent = useParent()

  if (!parent || !parent.links) {
    return
  }
  return Object.values(parent.links).map(({ id }) => id)
}

export const useGoSide = () => {
  const [{ storyId }] = useStore((state) => state.navigation)
  const siblingIds = useSiblings()
  const dispatch = useDispatch()

  if (!siblingIds) {
    return {}
  }

  const focusIndex = siblingIds.indexOf(storyId)
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
