import { useSelector } from 'react-redux'

export const useNavigation = (permanentStoreId) => {
  const { connection } = useSelector((state) => state.home)
  const navigationStoreId = permanentStoreId || connection
  return useSelector((state) => state.navigation[navigationStoreId]) || {}
}
