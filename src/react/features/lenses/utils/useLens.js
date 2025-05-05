import { useSelector } from '../../../store'

export const useLens = (lensId) => {
  const { selectedLensId } = useSelector((state) => state.lenses)
  return {
    enabled: lensId === selectedLensId,
  }
}
