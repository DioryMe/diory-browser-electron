import { useSelector } from 'react-redux'

export const useHomeDiographKey = (id) => {
  const { address } = useSelector((state) => state.home)
  return `${address}${id}`
}
