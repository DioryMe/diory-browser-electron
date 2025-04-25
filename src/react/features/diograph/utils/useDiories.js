import { useSelector } from 'react-redux'
import { resolveDiories } from './resolveDiories'
import { useNavigation } from '../../navigation/useNavigation'

export const useDiories = () => {
  const navigationState = useNavigation()
  const { diograph } = useSelector((state) => state.diograph)
  return resolveDiories(navigationState || {}, diograph)
}
