import { useStore } from '../../../store'

import { reduceIdsToKeys } from '../../../utils/reduceIdsToKeys'

export const useTextFilteredDiorys = () => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const [{ text: isActive }] = useStore((state) => state.filters.active)
  const [{ text: query = '' }] = useStore((state) => state.filters.filters)

  return (
    !!isActive &&
    query.length > 2 &&
    Object.values(diograph)
      .filter(({ text }) => text)
      .filter(({ text }) => text.toLowerCase().includes(query.toLowerCase()))
      .map(({ id }) => ({ id }))
      .reduce(reduceIdsToKeys, {})
  )
}
