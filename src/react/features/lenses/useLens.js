import { useDiograph } from '../diograph/useDiograph'
import { useFilterIsActive } from '../filters/hooks/useFilterIsActive'
import { useFilteredDiorys } from '../filters/useFilteredDiorys'

export const useLens = () => {
  const { filterIsActive } = useFilterIsActive()
  const focusDiorys = useDiograph()
  const filteredDiorys = useFilteredDiorys()

  return filterIsActive ? filteredDiorys : focusDiorys
}
