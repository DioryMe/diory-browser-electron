import { useStore } from '../../../store'

export const useFilter = (filterId) => {
  const [{ filters }] = useStore((state) => state.filters)
  return filters[filterId] || {}
}
