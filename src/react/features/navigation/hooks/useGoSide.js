import { useDispatch, useStore } from '../../../store'
import { setSelectedDiory } from '../actions'
import { useFocus } from '../../diograph/hooks'

const useSiblings = () => {
  const { diorys } = useFocus()

  return Object.values(diorys).map(({ id }) => id)
}

export const useGoSide = () => {
  const [{ selectedDioryId }] = useStore((state) => state.navigation)
  const siblings = useSiblings()
  const dispatch = useDispatch()

  if (!siblings) {
    return {}
  }

  const focusIndex = siblings.indexOf(selectedDioryId)
  if (focusIndex === 0) {
    return {
      goRight: () => dispatch(setSelectedDiory({ id: siblings[focusIndex + 1] })),
    }
  }

  if (focusIndex === siblings.length - 1) {
    return {
      goLeft: () => dispatch(setSelectedDiory({ id: siblings[focusIndex - 1] })),
    }
  }

  return {
    goRight: () => dispatch(setSelectedDiory({ id: siblings[focusIndex + 1] })),
    goLeft: () => dispatch(setSelectedDiory({ id: siblings[focusIndex - 1] })),
  }
}
