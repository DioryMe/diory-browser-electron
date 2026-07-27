import { useSelector } from '../../../store'

export const useMapSelectedDiory = () => {
  const { open } = useSelector((state) => state.buttons)
  const { selectedDiories } = useSelector((state) => state.tools)
  return {
    mapSelectedDiory: (diory) => {
      const isFolder = diory.links && diory.links.length
      return {
        ...diory,
        selected: open ? !!selectedDiories[diory.key] : null,
        amount:
          open && isFolder
            ? `${diory.links.filter((link) => selectedDiories[link.id]).length}/${
                diory.links.length
              }`
            : undefined,
      }
    },
  }
}
