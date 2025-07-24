import { useSelector } from 'react-redux'

export const useHomeKey = (id) => {
  const { address } = useSelector((state) => state.home)
  return `${address}${id}`
}
