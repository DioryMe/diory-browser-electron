import { useSelector } from '../../../store'
import { useLensButton } from './useLensButton'

export const useLens = (button) => {
  useLensButton(button)

  const { selectedLensId } = useSelector((state) => state.lenses)
  return selectedLensId === button.id
}
