import { useDispatch, useStore } from '../../../store'
import { setSelectedLink } from '../actions'
import { useFocus } from '../../diograph/hooks'

const useSiblings = () => {
  const { diorys } = useFocus()

  return Object.values(diorys).map(({ id }) => id)
}

export const useGoSide = () => {
  const [{ link }] = useStore((state) => state.navigation)
  const siblings = useSiblings()
  const { diorys } = useFocus()
  const dispatch = useDispatch()

  if (!siblings) {
    return {}
  }

  const focusIndex = siblings.indexOf(link)
  if (focusIndex === 0) {
    return {
      goRight: () => dispatch(setSelectedLink(diorys[focusIndex + 1])),
    }
  }

  if (focusIndex === siblings.length - 1) {
    return {
      goLeft: () => dispatch(setSelectedLink(diorys[focusIndex - 1])),
    }
  }

  return {
    goRight: () => dispatch(setSelectedLink(diorys[focusIndex + 1])),
    goLeft: () => dispatch(setSelectedLink(diorys[focusIndex - 1])),
  }
}
