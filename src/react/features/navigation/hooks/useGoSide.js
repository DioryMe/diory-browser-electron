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

const sortByDate = (link1, link2, diograph) => {
  const date1 = new Date(diograph[link1.id].date)
  const date2 = new Date(diograph[link2.id].date)

  if (date1 < date2) {
    return -1
  }
  if (date1 > date2) {
    return 1
  }

  return 0
}

const useSiblings = () => {
  const parent = useParent()
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const [{ diograph }] = useStore((state) => state.diograph)

  if (!parent || !parent.links) {
    return
  }

  if (selectedLensId === 'timeline') {
    return Object.values(parent.links)
      .sort((link1, link2) => sortByDate(link1, link2, diograph))
      .map(({ id }) => id)
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
