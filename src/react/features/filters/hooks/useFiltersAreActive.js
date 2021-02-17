import { useStore } from '../../../store'

export const useFiltersAreActive = () => {
  const [{ filters }] = useStore((state) => state.filters)
  return !!Object.values(filters).filter(({ active }) => active).length
}
