import { useSelector } from 'react-redux'
import { useDiographData } from './utils/useDiographData'
import { useNavigation } from '../navigation/useNavigation'

export const useDiograph = (permanentStoreId) => {
  const { storeId } = useSelector((state) => state.home)
  const diographStoreId = permanentStoreId || storeId

  const navigationState = useNavigation(permanentStoreId)
  const diographState = useSelector((state) => state.diograph[diographStoreId])
  return useDiographData(navigationState || {}, diographState)
}
