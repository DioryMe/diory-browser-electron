import React from 'react'
import { Pane, SearchInput } from 'evergreen-ui'
import { useDispatch, useStore } from '../../../store'
import { useSearchTool } from '../../room/tools/useSearchTool'

const useSearchInput = () => {
  const [{ roomId }] = useStore((state) => state.navigation)
  const { onFocus, onChange } = useSearchTool()

  const searchInput = roomId && {
    placeholder: 'Search your diory',
    onFocus: ({ target: { value } }) => onFocus(value),
    onChange: ({ target: { value } }) => onChange(value),
  }

  return { searchInput }
}

const NavigationSearch = (props) => {
  const { searchInput } = useSearchInput()
  return <Pane {...props}>{searchInput && <SearchInput width={200} {...searchInput} />}</Pane>
}

export default NavigationSearch
