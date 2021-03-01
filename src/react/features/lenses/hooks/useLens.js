import { useEffect } from 'react'
import { useDispatchActions, useStore } from '../../../store'
import { useFocus } from '../../diograph/hooks'
import { useFiltersAreActive } from '../../filters/hooks/useFiltersAreActive'
import { useFilteredDiorys } from '../../filters/useFilteredDiorys'

import { addLensButton } from '../actions'

export const useAddLensButton = (lensDiory) => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(addLensButton(lensDiory))
  }, [])
}

export const useLensIsSelected = (lensDiory) => {
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  return {
    lensIsSelected: selectedLensId === lensDiory.id,
  }
}

export const useLensDiorys = () => {
  const { filtersAreActive } = useFiltersAreActive()
  const focusDiorys = useFocus()
  const filteredDiorys = useFilteredDiorys()
  const lensDiorys = filtersAreActive ? filteredDiorys : focusDiorys
  console.log('Diorys in lens', lensDiorys.diorys.length)

  return lensDiorys
}
