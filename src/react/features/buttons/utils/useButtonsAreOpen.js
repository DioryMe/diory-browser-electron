import { useSelector } from 'react-redux'

export const useButtonsAreOpen = () => {
  const { open } = useSelector((state) => state.buttons)
  return open
}
