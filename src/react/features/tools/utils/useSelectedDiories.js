import { useSelector } from '../../../store'

export const useSelectedDiories = () => {
  const { open } = useSelector((state) => state.buttons)
  const { diograph } = useSelector((state) => state.diograph)
  const { selectedDiories } = useSelector((state) => state.tools)
  return {
    selectedDiories: Object.entries(selectedDiories || {})
      .filter(([, selected]) => selected)
      .map(([key]) => ({ key, ...diograph[key] })),
    mapSelectedDiory: (diory) => ({
      ...diory,
      selected: open ? !!selectedDiories[diory.key] : null,
    }),
    isSelectedDiory: ({ key }) => !!selectedDiories[key],
  }
}
