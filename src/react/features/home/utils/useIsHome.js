import { useSelector } from '../../../store'

export const useIsHome = () => {
  const { address: homeAddress } = useSelector((state) => state.home)
  const { address: diographAddress } = useSelector((state) => state.diograph)
  return !homeAddress || !diographAddress || diographAddress === homeAddress
}
