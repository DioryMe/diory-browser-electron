import { useSelector } from 'react-redux'

export const useNavigation = (permanentStoreId) => {
  const { storeId } = useSelector((state) => state.home)
  const navigationStoreId = permanentStoreId || storeId
  return useSelector((state) => state.navigation[navigationStoreId]) || {}
}
