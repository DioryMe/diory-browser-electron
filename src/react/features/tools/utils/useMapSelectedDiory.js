import { useSelector } from '../../../store'

export const isDioryInDiograph = (dioryId, diographAddress, diograph) => {
  const homeDioryIds = Object.entries(diograph)
    .filter(([key]) => key.startsWith(diographAddress))
    .map(([, { id }]) => id)
  return homeDioryIds.includes(dioryId)
}

// TODO extract home diories
export const useMapSelectedDiory = () => {
  const { address } = useSelector((state) => state.home)
  const { open } = useSelector((state) => state.buttons)
  const { diograph, isDiory } = useSelector((state) => state.diograph)
  const { selectedDiories } = useSelector((state) => state.tools)

  if (isDiory) {
    return {
      mapSelectedDiory: (diory) => ({
        ...diory,
        selected: open ? !!selectedDiories[diory.key] : null,
      })
    }
  }

  return {
    mapSelectedDiory: (diory) => ({
      ...diory,
      selected: isDioryInDiograph(diory.id, address, diograph),
    })
  }
}
