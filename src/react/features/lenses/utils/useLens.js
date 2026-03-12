import { useSelector } from '../../../store'

export const useLens = (button) => {
  const { selectedLensId } = useSelector((state) => state.lenses)
  return selectedLensId === button.id
}
