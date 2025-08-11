import { useSelector } from '../../store'
import { useLensButton } from './utils/useLensButton'
import { useCreateHomeDiory } from '../home/utils/useCreateHomeDiory'

export const useLens = (button) => {
  useLensButton(button)
  useCreateHomeDiory(button.id)

  const { selectedLensId } = useSelector((state) => state.lenses)
  return selectedLensId === button.id
}
