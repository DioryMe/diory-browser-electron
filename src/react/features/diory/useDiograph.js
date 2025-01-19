import { useSelector } from '../../store'
import { useDiographData } from '../../components/diograph/useDiographData'

export const useDiograph = () => {
  const dioryState = useSelector((state) => state.diory)
  return useDiographData(dioryState)
}
