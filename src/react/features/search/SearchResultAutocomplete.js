import React from 'react'
import { Pane } from 'evergreen-ui'
import { v4 as uuid } from 'uuid'

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
    const newDiory = { id: uuid(), text: query }
    dispatch(createDiory(newDiory))
    dispatch(setSearchResults([newDiory].concat(searchResults)))
  }

  return (
    <Pane style={style} onClick={onClick}>
      <Icon size={32} icon="plus" marginLeft={4} marginRight={4} />
      {query}
    </Pane>
  )
}

export default SearchResultAutocomplete
