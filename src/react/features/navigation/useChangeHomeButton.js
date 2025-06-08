import { useSaveHomeAddress } from '../home/useSaveHomeAddress'

export const useChangeHomeButton = () => {
  const { onClick } = useSaveHomeAddress()
  return {
    icon: 'log-out',
    onClick,
  }
}
