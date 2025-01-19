import { useSelector } from 'react-redux'
import { useDiographData } from '../../components/diograph/useDiographData'

export const useDiograph = () => {
  const { store } = useSelector((state) => state.home)
  const storeData = useSelector((state) => state[store])
  return useDiographData(storeData || {})
}
