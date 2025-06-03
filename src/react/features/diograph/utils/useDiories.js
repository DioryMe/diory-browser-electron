import { useSelector } from 'react-redux'
import { resolveDiories } from './resolveDiories'
import { useNavigation } from '../../navigation/useNavigation'

export const useStoryDiories = (navigationState = {}) => {
  const { diograph } = useSelector((state) => state.diograph)
  return resolveDiories(navigationState, diograph)
}

export const useDiories = () => {
  const navigationState = useNavigation()
  return useStoryDiories(navigationState)
}
