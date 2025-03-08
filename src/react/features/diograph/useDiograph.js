import { useSelector } from 'react-redux'
import { useDiographData } from './utils/useDiographData'
import { useNavigation } from '../navigation/useNavigation'

export const useDiograph = () => {
  const navigationState = useNavigation()
  const { diograph } = useSelector((state) => state.diograph)
  return useDiographData(navigationState || {}, diograph)
}
