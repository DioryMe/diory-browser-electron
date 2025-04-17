import { useSelector } from 'react-redux'

export const useKey = (id) => {
  const { address } = useSelector((state) => state.home)
  return `${address}${id}`
}
