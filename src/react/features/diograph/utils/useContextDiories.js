import { useSelector } from 'react-redux'
import { useNavigation } from '../../navigation/useNavigation'
import { resolveContextDiories } from './resolveContextDiories'

export const useContextDiories = () => {
  const navigationState = useNavigation()
  const { diograph } = useSelector((state) => state.diograph)
  return resolveContextDiories(navigationState || {}, diograph)
}
