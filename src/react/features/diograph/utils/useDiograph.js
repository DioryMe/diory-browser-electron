import { useSelector } from 'react-redux'

export const useDiograph = (diographAddress) => {
  const { address, diograph } = useSelector((state) => state.diograph)
  return {
    diograph: Object.fromEntries(
      Object.entries(diograph).filter(([key]) => key.startsWith(diographAddress || address))
    ),
  }
}
