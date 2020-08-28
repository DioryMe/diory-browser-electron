import { useDispatch, useStore } from '../../../store'
import { goSide } from '../actions'

export const useParent = () => {
  const [{ backward }] = useStore((state) => state.navigation)
  const [{ diograph }] = useStore((state) => state.room)
  if (!backward.length) {
    return
  }
  const parentId = backward[0][1]
  return diograph[parentId]
}

const useSiblings = () => {
  const parent = useParent()

  if (!parent || !parent.links) {
    return
  }
  return Object.values(parent.links).map(({ id }) => id)
}

export const useGoSide = () => {
  const [{ focus }] = useStore((state) => state.navigation)
  const siblings = useSiblings()
  const dispatch = useDispatch()

  if (!siblings) {
    return {}
  }

  const focusIndex = siblings.indexOf(focus)
  if (focusIndex === 0) {
    return {
      goRight: () => dispatch(goSide({ focus: siblings[focusIndex + 1] })),
    }
  }

  if (focusIndex === siblings.length - 1) {
    return {
      goLeft: () => dispatch(goSide({ focus: siblings[focusIndex - 1] })),
    }
  }

  return {
    goRight: () => dispatch(goSide({ focus: siblings[focusIndex + 1] })),
    goLeft: () => dispatch(goSide({ focus: siblings[focusIndex - 1] })),
  }
}
