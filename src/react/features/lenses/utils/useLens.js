import { useSelector } from '../../../store'
import { useLensButton } from './useLensButton'
import { useCreateDioryById } from '../../tools/createDiory/useCreateDioryById'

export const useLens = (button) => {
  useLensButton(button)
  useCreateDioryById(button.id)

  const { selectedLensId } = useSelector((state) => state.lenses)
  return selectedLensId === button.id
}
