import { useSelector } from '../../../store'

export const useMapSelectedDiory = () => {
  const { open } = useSelector((state) => state.buttons)
  const { selectedDiories } = useSelector((state) => state.tools)
  return {
    mapSelectedDiory: (diory) => {
      return ({
        ...diory,
        selected: open ? !!selectedDiories[diory.key] : null,
      })
    },
  }
}
