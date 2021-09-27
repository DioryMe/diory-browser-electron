import React from 'react'
import { Pane } from 'evergreen-ui'

import { useStore } from '../../store'

import Icon from '../../components/Icon'

const style = {
  border: '1px solid black',
  height: '50px',
  cursor: 'pointer',
  padding: 'auto',
}

const SearchResultAutocomplete = () => {
  const [{ query }] = useStore((state) => state.search)
  const onClick = () => {
    alert('dispatch(createDiory(query))')
  }

  return (
    <Pane style={style} onClick={onClick}>
      <Icon size={32} icon="plus" marginLeft={4} marginRight={4} />
      {query}
    </Pane>
  )
}

export default SearchResultAutocomplete
