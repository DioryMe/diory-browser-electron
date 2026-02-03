import { useSelector } from 'react-redux'

export const useDiograph = (diographAddress) => {
  const { address, diograph, isDiory } = useSelector((state) => state.diograph)
  return {
    diograph: Object.fromEntries(
      Object.entries(diograph).filter(([key]) => key.startsWith(diographAddress || address))
    ),
    isDiory,
    address,
  }
}
