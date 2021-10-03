import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDispatch, useStore } from '../../store'
import { createDiory } from '../diograph/actions'
import { setSearchResults } from './actions'

import Icon from '../../components/Icon'

const style = {
  border: '1px solid black',
  height: '50px',
  cursor: 'pointer',
  padding: 'auto',
}

const SearchResultAutocomplete = () => {
  const [{ query, searchResults }] = useStore((state) => state.search)
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(createDiory({ text: query }))
    dispatch(setSearchResults([{ text: query }].concat(searchResults)))
  }

  return (
    <Pane style={style} onClick={onClick}>
      <Icon size={32} icon="plus" marginLeft={4} marginRight={4} />
      {query}
    </Pane>
  )
}

export default SearchResultAutocomplete
