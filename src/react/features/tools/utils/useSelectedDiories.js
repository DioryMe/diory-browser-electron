import { useSelector } from '../../../store'

export const useSelectedDiories = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { selectedDiories } = useSelector((state) => state.tools)
  const selectedDioriesWithKey = Object.entries(selectedDiories || {})
    .filter(([, selected]) => selected)
    .map(([key]) => ({ key, ...diograph[key] }))

  return {
    selectedDiories: selectedDioriesWithKey,
  }
}
