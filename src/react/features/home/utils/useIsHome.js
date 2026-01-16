import { useSelector } from '../../../store'

export const useIsHome = () => {
  const { isHome } = useSelector((state) => state.home)
  return isHome
}
