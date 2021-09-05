import { useDispatch, useStore } from '../../../store'
import { setSelectedDiory } from '../actions'
import { useFocus } from '../../diograph/hooks'

const useSiblings = () => {
  const { diorys } = useFocus()

  return Object.values(diorys).map(({ id }) => id)
}

export const useGoSide = () => {
  const [{ selectedDioryId }] = useStore((state) => state.navigation)
  const siblingIds = useSiblings()
  const dispatch = useDispatch()

  if (!siblingIds) {
    return {}
  }

  const focusIndex = siblingIds.indexOf(selectedDioryId)
  if (focusIndex === 0) {
    return {
      goRight: () => dispatch(setSelectedDiory({ id: siblingIds[focusIndex + 1] })),
    }
  }

  if (focusIndex === siblingIds.length - 1) {
    return {
      goLeft: () => dispatch(setSelectedDiory({ id: siblingIds[focusIndex - 1] })),
    }
  }

  return {
    goRight: () => dispatch(setSelectedDiory({ id: siblingIds[focusIndex + 1] })),
    goLeft: () => dispatch(setSelectedDiory({ id: siblingIds[focusIndex - 1] })),
  }
}
