import { useSelector } from '../../store'
import { useDiographData } from '../../components/diograph/useDiographData'

export const useDiosphere = () => {
  const diosphereState = useSelector((state) => state.diosphere)
  return useDiographData(diosphereState)
}
