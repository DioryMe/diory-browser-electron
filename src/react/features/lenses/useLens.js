import { useSelector } from '../../store'

export const useLens = (id) => {
  const { selectedLensId } = useSelector((state) => state.lenses)
  return selectedLensId === id
}
