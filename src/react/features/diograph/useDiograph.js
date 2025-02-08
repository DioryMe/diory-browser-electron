import { useSelector } from 'react-redux'
import { useDiographData } from './utils/useDiographData'
import { useNavigation } from '../navigation/useNavigation'

export const useDiograph = () => {
  const { connection } = useSelector((state) => state.home)

  const navigationState = useNavigation(connection)
  const diographState = useSelector((state) => state.diograph[connection])
  return useDiographData(navigationState || {}, diographState)
}
