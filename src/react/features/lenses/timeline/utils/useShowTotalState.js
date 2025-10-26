import { useSelector } from 'react-redux'

export const useShowTotalState = () => {
  const { open } = useSelector((state) => state.buttons)
  return open
}
