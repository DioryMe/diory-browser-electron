import { useStore } from '../../../store'

export const useFilterIsActive = () => {
  const [{ filters }] = useStore((state) => state.filters)
  return {
    filterIsActive: !!Object.values(filters).filter(({ active }) => active).length,
  }
}
