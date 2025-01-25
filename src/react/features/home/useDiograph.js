import { useSelector } from 'react-redux'
import { useDiographData } from '../../components/diograph/useDiographData'

export const useDiograph = () => {
  const { storeId } = useSelector((state) => state.home)
  const navigationState = useSelector((state) => state.navigation[storeId])
  const { diograph } = useSelector((state) => state[storeId])
  return useDiographData(navigationState || {}, diograph)
}
